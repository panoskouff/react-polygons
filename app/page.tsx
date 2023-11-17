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
import { useSvgPanelHandlers } from '#/hooks';

const SVGPanel = () => {
  const { state, dispatch } = usePolygonsContext();
  const { SvgPanelClickHandler } = useSvgPanelHandlers(state, dispatch);
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

  const initializeGParentElementRef = (target: SVGElement) => {
    /* <g> needed to find children,polygonId and for handleMouseMove
    we need to initialize it only for the correct states or if a graph
    element is the one that was clicked so we can't just have this code
    once, we have to call it in multiple places */
    if (
      target.tagName === 'polygon' ||
      target.tagName === 'line' ||
      target.tagName === 'circle'
    ) {
      if ((target.parentNode as SVGGElement)?.tagName !== 'g') {
        console.error('handleMouseDown: Missing parent <g> element');
        return;
      }
      currentGElement.current = target.parentNode as SVGGElement;
    }
  };

  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const target = event.target as SVGElement;
    if (state.mode === 'move-polygon') {
      if (target.tagName === 'polygon') {
        initializeGParentElementRef(target);
        lastPosition.current = { x: event.clientX, y: event.clientY };
        isDragging.current = true;
      }
    } else if (state.mode === 'move-vertex') {
      if (target.tagName === 'circle') {
        initializeGParentElementRef(target);
        const polygonId =
          currentGElement.current?.getAttribute('data-polygonId');
        const vertexIndexStr = target.getAttribute('data-vertex-index');
        if (!polygonId || !vertexIndexStr || !currentGElement.current) {
          console.error(
            'handleMouseDown: Missing polygonId or vertexIndex or <g> parent'
          );
          return;
        }
        const vertexIndex = parseInt(vertexIndexStr);
        /* vertex index will save us a lookup in polygon points and
        also is needed to figure out which lines are adjacent */
        currentCircleVertexIndex.current = vertexIndex;
        const x = target.getAttribute('cx');
        const y = target.getAttribute('cy');
        if (!x || !y) {
          // here to satisfy typescript - this should never happen
          console.error('handleMouseDown: Missing x or y');
          return;
        }
        const point = { x: parseInt(x), y: parseInt(y) };
        /* We need to keep initial position to calculate the final that
        is going to be committed to state on mouse up */
        currentCircleInitialPosition.current = point;
        /* Get a reference to all elements related to this point so we
        can move them while dragging the point */
        currentCircleElement.current = target as SVGCircleElement;
        const lines = currentGElement.current.querySelectorAll('line');
        currentNextLineElement.current = lines[vertexIndex] as SVGLineElement;
        if (vertexIndex === 0) {
          currentPrevLineElement.current = lines[
            lines.length - 1
          ] as SVGLineElement;
        } else {
          currentPrevLineElement.current = lines[
            vertexIndex - 1
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

  const calculatePointerDragOffset = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const deltaX = event.clientX - lastPosition.current.x;
    const deltaY = event.clientY - lastPosition.current.y;

    dragOffset.current = {
      x: dragOffset.current.x + deltaX,
      y: dragOffset.current.y + deltaY,
    };
    lastPosition.current = { x: event.clientX, y: event.clientY };
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (!isDragging.current) {
      return;
    }

    if (state.mode === 'move-polygon') {
      if (!currentGElement.current) return;
      requestAnimationFrame(() => {
        if (currentGElement.current) {
          calculatePointerDragOffset(event);

          currentGElement.current.setAttribute(
            'transform',
            `translate(${dragOffset.current.x}, ${dragOffset.current.y})`
          );
        }
      });
    } else if (state.mode === 'move-vertex') {
      if (
        !currentCircleElement.current ||
        (!currentCircleVertexIndex.current &&
          currentCircleVertexIndex.current !== 0) ||
        !currentPolygonPoints.current
      ) {
        console.error('handleMouseMove: Missing ref(s)');
        return;
      }

      const polygonPoints = currentPolygonPoints.current;
      requestAnimationFrame(() => {
        if (
          !currentCircleInitialPosition.current ||
          !currentCircleInitialPosition.current.x ||
          !currentCircleInitialPosition.current.y
        ) {
          console.error(
            'handleMouseMove: requestAnimationFrame: Missing ref(s)'
          );
          return;
        }

        calculatePointerDragOffset(event);

        const newPoint = {
          x: currentCircleInitialPosition.current.x + dragOffset.current.x,
          y: currentCircleInitialPosition.current.y + dragOffset.current.y,
        };

        const newPolygonPoints = polygonPoints.reduce((acc, point, index) => {
          if (index === currentCircleVertexIndex.current) {
            return `${acc} ${newPoint.x},${newPoint.y}`;
          } else if (index === polygonPoints.length - 1) {
            return acc;
          }
          return `${acc} ${point.x},${point.y}`;
        }, '');

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
    // no early returns here so we do proper cleanup
    const polygonId = currentGElement.current?.getAttribute('data-polygonId');
    isDragging.current = false;

    if (state.mode === 'move-polygon') {
      if (!currentGElement.current || !polygonId) {
        console.error('handleMouseUp: Missing ref(s) or polygonId');
      } else {
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
      }
    } else if (state.mode === 'move-vertex') {
      if (
        !currentPolygonPoints.current ||
        (!currentCircleVertexIndex.current &&
          currentCircleVertexIndex.current !== 0) ||
        !currentCircleInitialPosition.current ||
        !polygonId
      ) {
        console.error('handleMouseUp: Missing ref(s) or polygonId');
      } else {
        const newPoint = {
          x: currentCircleInitialPosition.current.x + dragOffset.current.x,
          y: currentCircleInitialPosition.current.y + dragOffset.current.y,
        };

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

    currentCircleElement.current = null;
    currentNextLineElement.current = null;
    currentPrevLineElement.current = null;
    currentPolygonElement.current = null;
    currentPolygonPoints.current = null;
    currentCircleVertexIndex.current = null;
    currentGElement.current = null;
    dragOffset.current = { x: 0, y: 0 };
  };

  return (
    <>
      <Position {...expanded}>
        <svg
          width='100%'
          height='100%'
          onClick={SvgPanelClickHandler}
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
          <SVGPanel />
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
