'use server';

import { PolygonsContextProvider } from '#/context/polygons-context/PolygonsContext';
import { getServerSession } from 'next-auth';
import SessionProvider from '#/components/SessionProvider';
import { authOptions } from './api/auth/[...nextauth]/authOptions';
import ServerMemoryState from '#/state/ServerMemoryState';
import { SvgPanel } from '#/components/svg-panel/SvgPanel';

export default async function Home() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  let userWorkSpace = null;
  if (userId) {
    // if user signed in load user's workspace
    userWorkSpace = ServerMemoryState.getWorkspaceForUser(userId);
  }

  return (
    <SessionProvider session={session}>
      <PolygonsContextProvider initialWorkSpace={userWorkSpace}>
        <SvgPanel />
      </PolygonsContextProvider>
    </SessionProvider>
  );
}
