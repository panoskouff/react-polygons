'use client';

import { styled } from '#/styled-system/jsx';
import {
  RemainingHeightContainer,
  Space,
  Center,
  Padding,
  Text,
  Position,
  Background,
  Column,
} from '#/atoms';
// import { Space } from '#/atoms';

export default function HomeContent() {
  return (
    <>
      <Position pos='fixed' css={{ h: '100vh' }}>
        <Background bg='#efefef' h='100%'>
          <Position>
            <svg
              width='100%'
              height='100%'
              xmlns='http://www.w3.org/2000/svg'
            ></svg>
          </Position>
          {/* side menu */}
          <Position right='2vw' top='20vh' left='auto'>
            <Background bg='#fff' css={{ borderRadius: '10px' }}>
              <Padding p='10px'>
                <Column gap='10px'>
                  <styled.button maxW='50px'>
                    <Text>todo</Text>
                  </styled.button>
                  <styled.button maxW='50px'>
                    <Text>todo</Text>
                  </styled.button>
                </Column>
              </Padding>
            </Background>
          </Position>
        </Background>
      </Position>
    </>
  );
}
