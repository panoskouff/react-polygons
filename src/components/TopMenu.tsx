'use client';

import { styled } from '#/styled-system/jsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Padding, Background, Row, Button, Text } from '#/atoms';

export const TopMenu = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  const userLoggedIn = status === 'authenticated';

  if (!userLoggedIn) {
    return <Button text='Sign In' onClick={() => signIn()} />;
  }

  const userFirstName = session?.user?.name?.split(' ')[0];
  const userImage = session?.user?.image;

  return (
    <Row gap='10px'>
      {userImage && (
        <styled.img
          src={userImage}
          width='40px'
          height='40px'
          boxShadow='variant'
          border='1px solid darkgray'
          borderRadius='50%'
        />
      )}
      <Background
        bg='#fff'
        css={{
          borderRadius: 'md',
          boxShadow: 'variant',
        }}
      >
        <Padding p='0px 10px'>
          {userFirstName && <Text>{userFirstName}</Text>}
        </Padding>
      </Background>
      <Button text='save' onClick={() => alert('todo')} />
      <Button text='Sign out' onClick={() => signOut()} />
    </Row>
  );
};
