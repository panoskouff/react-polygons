'use server';
import { authOptions } from '#/app/api/auth/[...nextauth]/authOptions';
import ServerMemoryState from '#/state/ServerMemoryState';
import { getServerSession } from 'next-auth';
import { Polygons } from '#/types/state/polygons';

type SaveWorkError = {
  message: string;
};

export type SaveWorkResponse = 'OK' | SaveWorkError;

export const saveWork = async (
  workspace: Polygons
): Promise<SaveWorkResponse> => {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      // should never happen
      const errorMessage =
        'No user id found in session, are you authenticated?';
      console.error(
        `saveWork error: no user id found in session ${JSON.stringify(
          session
        )}}`
      );
      return { message: errorMessage };
    }

    ServerMemoryState.saveWorkspaceForUser(userId, workspace);

    return 'OK';
  } catch (error) {
    let err = { message: 'Unknown error' };

    if (error instanceof Error) {
      err = { message: error.message };
      console.error(`saveWork error: ${err.message}`);
    } else {
      // unknown type of error
      console.error(`saveWork error: ${JSON.stringify(error)}`);
    }

    return err;
  }
};
