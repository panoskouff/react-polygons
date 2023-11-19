'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { Row, Button } from '#/atoms';
import { UserIndicator } from './UserIndicator';
import { SaveButton } from '#/components/save-button/SaveButton';

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
  const userImage = session?.user?.image ?? undefined;

  return (
    <Row gap='10px'>
      <UserIndicator name={userFirstName} image={userImage} />
      <SaveButton />
      <Button text='Sign out' onClick={() => signOut()} />
    </Row>
  );
};
