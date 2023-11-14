'use client';

import { styled } from '#/styled-system/jsx';
import {
  PolygonsContextProvider,
  usePolygonsContext,
} from '#/context/polygons-context/PolygonsContext';
import { Padding, Text, Position, Background, Column } from '#/atoms';
import { useState } from 'react';
// import { Space } from '#/atoms';

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
      {/* side menu */}
      <Position right='2vw' top='20vh' left='auto'>
        <Background bg='#fff' css={{ borderRadius: '10px' }}>
          <Padding p='10px'>
            <Column gap='10px'>
              <styled.button
                maxW='50px'
                onClick={() => {
                  if (state.mode === 'idle') {
                    dispatch({ type: 'SET_MODE_ADD' });
                  } else {
                    dispatch({ type: 'SET_MODE_IDLE' });
                  }
                }}
              >
                <Text>todo</Text>
              </styled.button>
              <styled.button maxW='50px'>
                <Text>todo</Text>
              </styled.button>
            </Column>
          </Padding>
        </Background>
      </Position>
    </>
  );
};

export default function Home() {
  return (
    <PolygonsContextProvider>
      <Position pos='fixed' css={{ h: '100vh' }}>
        <Background bg='#efefef' h='100%'>
          <SVGBoard />
        </Background>
      </Position>
    </PolygonsContextProvider>
  );
}
