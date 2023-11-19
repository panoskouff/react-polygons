'use server';
import { Polygons } from '#/types/state/polygons';

type ServerMemoryStateData = {
  usersWorkspaces: {
    // for now we only have one workspace per user
    [userId: string]: Polygons;
  };
  // other data
  [key: string]: any;
};

type ExtendedGlobal = typeof global & {
  ServerMemoryState?: ServerMemoryState;
};

/**
 * Note: Server memory is not preserved between server restarts.
 * */
class ServerMemoryState {
  private data: ServerMemoryStateData;

  private constructor() {
    this.data = {
      usersWorkspaces: {},
    };
  }

  private static getInstance(): ServerMemoryState {
    if (!(global as ExtendedGlobal).ServerMemoryState) {
      /* In development, Next clears Node.js cache on every run
      so we have to use global instead of a singleton */
      // @todo maybe an exported instance would work
      (global as ExtendedGlobal).ServerMemoryState = new ServerMemoryState();
    }

    return (global as ExtendedGlobal).ServerMemoryState as ServerMemoryState;
  }

  // users workspaces
  public static saveWorkspaceForUser(userId: string, value: Polygons): void {
    const instance = this.getInstance();

    instance.data.usersWorkspaces[userId] = value;
  }

  public static getWorkspaceForUser(userId: string): Polygons | null {
    const instance = this.getInstance();

    return instance.data.usersWorkspaces[userId];
  }

  // other data
  public static set(key: string, value: any): void {
    const instance = this.getInstance();

    instance.data[key] = value;
  }

  public static get(key: string): any {
    const instance = this.getInstance();

    return instance.data[key];
  }
}

export default ServerMemoryState;
