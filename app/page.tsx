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

// @todo rename this
const SVGBoard = () => {
  const { state, dispatch } = usePolygonsContext();
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });
  const currentGElement = useRef<SVGGElement | null>(null);

  console.log('##', state);

  const handleMouseDown = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (state.mode !== 'move') return;
    const target = event.target as SVGElement;
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
  };

  const handleMouseMove = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (!isDragging.current || !currentGElement.current) return;
    // console.log('handleMouseMove called');
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
  };

  const handleMouseUp = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    console.log('handleMouseUp called');
    if (isDragging.current && currentGElement.current) {
      isDragging.current = false;
      const polygonId = currentGElement.current.getAttribute('data-polygonId');
      // @todo update polygon points and remove translation
      dragOffset.current = { x: 0, y: 0 };
      currentGElement.current = null;
    }
  };

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const target = event.target as SVGElement;
    console.log('svgClickHandler called', target.tagName);

    if (state.mode === 'add') {
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
    } else if (state.mode === 'delete') {
      if (target.tagName === 'polygon') {
        const polygonId = target.parentElement?.getAttribute('data-polygonId');
        if (!polygonId) {
          console.error('svgClickHandler: Missing polygonId');
          return;
        }

        dispatch({
          type: 'DELETE_POLYGON',
          payload: { polygonId },
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
      <Position right='2vw' top='20vh'>
        <SideMenu />
      </Position>
    </>
  );
};

export default function Home() {
  return (
    <PolygonsContextProvider>
      {/* top={0} right={0} bottom={0} left={0} */}
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
