'use client';

import { styled } from '#/styled-system/jsx';
import {
  PolygonsContextProvider,
  usePolygonsContext,
} from '#/context/polygons-context/PolygonsContext';
import { Text, Position, Background } from '#/atoms';
import { SideMenu } from '#/components/SideMenu';

// @todo rename this
const SVGBoard = () => {
  const { state, dispatch } = usePolygonsContext();
  console.log('##', state);

  const svgClickHandler = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    const target = event.target as SVGElement;
    console.log('$$', state);

    // if (target.tagName === 'circle') {
    //   const circle = target as SVGCircleElement;
    //   const cx = circle.getAttribute('cx');
    //   const cy = circle.getAttribute('cy');
    //   alert('Circle position: cx = ' + cx + ', cy = ' + cy);
    // }
  };

  return (
    <>
      <Position>
        <svg
          width='100%'
          height='100%'
          onClick={svgClickHandler}
          xmlns='http://www.w3.org/2000/svg'
        ></svg>
      </Position>
      <Position right='2vw' top='20vh' left='auto'>
        <SideMenu />
      </Position>
    </>
  );
};

export default function Home() {
  return (
    <PolygonsContextProvider>
      <Position pos='fixed' css={{ h: '100vh' }}>
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
