'use client';

import { styled } from '#/styled-system/jsx';
import {
  PolygonsContextProvider,
  usePolygonsContext,
} from '#/context/polygons-context/PolygonsContext';
import { Text, Position, Background } from '#/atoms';
import { SideMenu } from '#/components/SideMenu';
import { TopMenu } from '#/components/TopMenu';
import { Polygons } from '#/components/Polygons';
import { useRef } from 'react';
import { Point } from '#/types';

// @todo rename this
const SVGBoard = () => {
  const { state, dispatch } = usePolygonsContext();
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const currentGElement = useRef<SVGGElement | null>(null);
  const currentPolygonElement = useRef<SVGPolygonElement | null>(null);
  const currentPrevLineElement = useRef<SVGLineElement | null>(null);
  const currentNextLineElement = useRef<SVGLineElement | null>(null);
  const currentCircleElement = useRef<SVGCircleElement | null>(null);
  const currentCircleInitialPosition = useRef<Point | null>(null);
  const currentCircleVertexIndex = useRef<number | null>(null);
  const currentPolygonPoints = useRef<Point[] | null>(null);

  console.log('##', state);

  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const target = event.target as SVGElement;
    if (state.mode === 'move-polygon') {
      console.log('handleMouseDown called', target.tagName);
      if (target.tagName === 'polygon') {
        if ((target.parentNode as SVGGElement)?.tagName !== 'g') {
          console.error('handleMouseDown: Missing parent <g> element');
          return;
        }
        currentGElement.current = target.parentNode as SVGGElement;
        lastPosition.current = { x: event.clientX, y: event.clientY };
        isDragging.current = true;
      }
    } else if (state.mode === 'move-vertex') {
      if (target.tagName === 'circle') {
        const polygonId = target.parentElement?.getAttribute('data-polygonId');
        const vertexIndex = target.getAttribute('data-vertex-index');
        if (!polygonId || !vertexIndex) {
          console.error('handleMouseDown: Missing polygonId or vertexIndex');
          return;
        }
        currentCircleVertexIndex.current = parseInt(vertexIndex);
        const x = target.getAttribute('cx');
        const y = target.getAttribute('cy');
        if (!x || !y) {
          // here to satisfy typescript - this should never happen
          console.error('handleMouseDown: Missing x or y');
          return;
        }
        const point = { x: parseInt(x), y: parseInt(y) };
        currentCircleInitialPosition.current = point;
        currentGElement.current = target.parentNode as SVGGElement;
        currentCircleElement.current = target as SVGCircleElement;
        const lines = currentGElement.current.querySelectorAll('line');
        currentNextLineElement.current = lines[
          parseInt(vertexIndex)
        ] as SVGLineElement;
        if (parseInt(vertexIndex) === 0) {
          currentPrevLineElement.current = lines[
            lines.length - 1
          ] as SVGLineElement;
        } else {
          currentPrevLineElement.current = lines[
            parseInt(vertexIndex) - 1
          ] as SVGLineElement;
        }
        currentPolygonElement.current =
          currentGElement.current.querySelector('polygon');
        currentPolygonPoints.current = state.polygons[polygonId].points;

        lastPosition.current = { x: event.clientX, y: event.clientY };
        isDragging.current = true;
      }
    }
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (state.mode === 'move-polygon') {
      if (!isDragging.current || !currentGElement.current) return;
      const deltaX = event.clientX - lastPosition.current.x;
      const deltaY = event.clientY - lastPosition.current.y;
      dragOffset.current = {
        x: dragOffset.current.x + deltaX,
        y: dragOffset.current.y + deltaY,
      };
      lastPosition.current = { x: event.clientX, y: event.clientY };

      requestAnimationFrame(() => {
        if (currentGElement.current) {
          currentGElement.current.setAttribute(
            'transform',
            `translate(${dragOffset.current.x}, ${dragOffset.current.y})`
          );
        }
      });
    } else if (state.mode === 'move-vertex') {
      if (!isDragging.current) {
        return;
      }

      if (
        !currentCircleElement.current ||
        !currentCircleInitialPosition.current ||
        (!currentCircleVertexIndex.current &&
          currentCircleVertexIndex.current !== 0) ||
        !currentPolygonPoints.current
      ) {
        console.error('handleMouseMove: Missing ref(s)');
        return;
      }

      const deltaX = event.clientX - lastPosition.current.x;
      const deltaY = event.clientY - lastPosition.current.y;

      dragOffset.current = {
        x: dragOffset.current.x + deltaX,
        y: dragOffset.current.y + deltaY,
      };
      lastPosition.current = { x: event.clientX, y: event.clientY };

      const newPoint = {
        x: currentCircleInitialPosition.current.x + dragOffset.current.x,
        y: currentCircleInitialPosition.current.y + dragOffset.current.y,
      };

      const polygonPoints = currentPolygonPoints.current;

      const newPolygonPoints = polygonPoints.reduce((acc, point, index) => {
        if (index === currentCircleVertexIndex.current) {
          return `${acc} ${newPoint.x},${newPoint.y}`;
        } else if (index === polygonPoints.length - 1) {
          return acc;
        }
        return `${acc} ${point.x},${point.y}`;
      }, '');

      console.log({ polygonPoints, newPolygonPoints });

      requestAnimationFrame(() => {
        currentCircleElement.current?.setAttribute('cx', newPoint.x.toString());
        currentCircleElement.current?.setAttribute('cy', newPoint.y.toString());
        currentNextLineElement.current?.setAttribute(
          'x1',
          newPoint.x.toString()
        );
        currentNextLineElement.current?.setAttribute(
          'y1',
          newPoint.y.toString()
        );
        currentPrevLineElement.current?.setAttribute(
          'x2',
          newPoint.x.toString()
        );
        currentPrevLineElement.current?.setAttribute(
          'y2',
          newPoint.y.toString()
        );
        currentPolygonElement.current?.setAttribute('points', newPolygonPoints);
      });
    }
  };

  const handleMouseUp = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    console.log('handleMouseUp called');
    if (state.mode === 'move-polygon') {
      if (isDragging.current && currentGElement.current) {
        isDragging.current = false;
        const polygonId =
          currentGElement.current.getAttribute('data-polygonId');
        if (!polygonId) {
          console.error('handleMouseUp: Missing polygonId');
          return;
        }
        const polygonPoints = state.polygons[polygonId].points;
        const newPoints = polygonPoints.map((point) => {
          return {
            x: point.x + dragOffset.current.x,
            y: point.y + dragOffset.current.y,
          };
        });
        dispatch({
          type: 'EDIT_POLYGON_POINTS',
          payload: { polygonId, points: newPoints },
        });
        currentGElement.current.setAttribute('transform', `translate(0, 0)`);
        dragOffset.current = { x: 0, y: 0 };
        currentGElement.current = null;
      }
    } else if (state.mode === 'move-vertex') {
      isDragging.current = false;

      // @todo refactor to try catch
      const polygonId = currentGElement.current?.getAttribute('data-polygonId');
      if (
        currentPolygonPoints.current !== null &&
        currentCircleVertexIndex.current !== null &&
        !!polygonId
      ) {
        let newPoint = null;
        if (currentCircleInitialPosition.current) {
          newPoint = {
            x: currentCircleInitialPosition.current.x + dragOffset.current.x,
            y: currentCircleInitialPosition.current.y + dragOffset.current.y,
          };
        }

        if (newPoint !== null) {
          currentPolygonPoints.current[currentCircleVertexIndex.current] =
            newPoint;
          if (currentCircleVertexIndex.current === 0) {
            /* first and last point are always the
                same to complete the polygon */
            currentPolygonPoints.current[
              currentPolygonPoints.current.length - 1
            ] = newPoint;
          }
          const newPoints = [...currentPolygonPoints.current];

          dispatch({
            type: 'EDIT_POLYGON_POINTS',
            payload: { polygonId, points: newPoints },
          });
        }
      }

      dragOffset.current = { x: 0, y: 0 };
      currentCircleElement.current = null;
      currentNextLineElement.current = null;
      currentPrevLineElement.current = null;
      currentPolygonElement.current = null;
      currentGElement.current = null;
      currentPolygonPoints.current = null;
      currentCircleVertexIndex.current = null;
    }
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = event.target as SVGElement;
    console.log('svgClickHandler called', target.tagName);

    if (state.mode === 'add-polygon') {
      if (target.tagName === 'svg' || target.tagName === 'circle') {
        dispatch({
          type: 'ADD_POINT',
          payload: {
            point: { x: event.clientX, y: event.clientY },
            clickedOnPoint: target.tagName === 'circle',
          },
        });
      }
      return;
    } else if (state.mode === 'remove-polygon') {
      if (target.tagName === 'polygon') {
        const polygonId = target.parentElement?.getAttribute('data-polygonId');
        if (!polygonId) {
          console.error('svgClickHandler: Missing polygonId');
          return;
        }

        dispatch({
          type: 'REMOVE_POLYGON',
          payload: { polygonId },
        });
      }
    } else if (state.mode === 'add-vertex-to-side') {
      if (target.tagName === 'line') {
        const polygonId = target.parentElement?.getAttribute('data-polygonId');
        if (!polygonId) {
          console.error('svgClickHandler: Missing polygonId');
          return;
        }
        const x = target.getAttribute('x1');
        const y = target.getAttribute('y1');
        if (!x || !y) {
          // here to satisfy typescript - this should never happen
          console.error('svgClickHandler: Missing x or y');
          return;
        }
        const prevPoint = { x: parseInt(x), y: parseInt(y) };
        const newPoint = { x: event.clientX, y: event.clientY };
        dispatch({
          type: 'ADD_VERTEX_TO_SIDE',
          payload: { polygonId, prevPoint, newPoint },
        });
      }
    } else if (state.mode === 'remove-vertex') {
      if (target.tagName === 'circle') {
        const polygonId = target.parentElement?.getAttribute('data-polygonId');
        if (!polygonId) {
          console.error('svgClickHandler: Missing polygonId');
          return;
        }
        const x = target.getAttribute('cx');
        const y = target.getAttribute('cy');
        if (!x || !y) {
          // here to satisfy typescript - this should never happen
          console.error('svgClickHandler: Missing x or y');
          return;
        }
        const point = { x: parseInt(x), y: parseInt(y) };
        dispatch({
          type: 'REMOVE_VERTEX',
          payload: { polygonId, point },
        });
      }
    } else if (state.mode === 'remove-side') {
      if (target.tagName === 'line') {
        const polygonId = target.parentElement?.getAttribute('data-polygonId');
        if (!polygonId) {
          console.error('svgClickHandler: Missing polygonId');
          return;
        }
        const x1 = target.getAttribute('x1');
        const y1 = target.getAttribute('y1');
        const x2 = target.getAttribute('x2');
        const y2 = target.getAttribute('y2');
        if (!x1 || !y1 || !x2 || !y2) {
          // here to satisfy typescript - this should never happen
          console.error('svgClickHandler: Missing Points of line');
          return;
        }
        const point1 = { x: parseInt(x1), y: parseInt(y1) };
        const point2 = { x: parseInt(x2), y: parseInt(y2) };
        dispatch({
          type: 'REMOVE_SIDE',
          payload: { polygonId, point1, point2 },
        });
      }
    }
  };

  return (
    <>
      <Position {...expanded}>
        <svg
          width='100%'
          height='100%'
          onClick={handleClick}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          xmlns='http://www.w3.org/2000/svg'
        >
          <Polygons />
        </svg>
      </Position>
      <Position top='2vw' left='40vw'>
        <TopMenu />
      </Position>
      <Position right='2vw' top='10vh'>
        <SideMenu />
      </Position>
    </>
  );
};

export default function Home() {
  return (
    <PolygonsContextProvider>
      <Position pos='fixed' {...expanded} css={{ h: '100vh' }}>
        <Background
          bg='#f7f7f7'
          backgroundSize='30px 30px'
          backgroundImage='linear-gradient(to right, grey 1px, transparent 1px),
    linear-gradient(to bottom, grey 1px, transparent 1px)'
          h='100%'
        >
          <SVGBoard />
        </Background>
      </Position>
    </PolygonsContextProvider>
  );
}

const expanded = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
};
