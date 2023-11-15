export type State = {
  mode: 'idle' | 'add' | 'delete';
  selectedPolygon: string | null;
  polygons: {
    [key: string]: {
      isComplete: boolean;
      points: {
        x: number;
        y: number;
      }[];
    };
  } | null;
};

export type setModeIdleAction = { type: 'SET_MODE_IDLE' };
export type setModeAddAction = { type: 'SET_MODE_ADD' };
export type setModeDeleteAction = { type: 'SET_MODE_DELETE' };

export type AddPointAction = {
  type: 'ADD_POINT';
  payload: { point: { x: number; y: number }; clickedOnPoint: boolean };
};

export type DeletePolygonAction = {
  type: 'DELETE_POLYGON';
  payload: { polygonId: string };
};

export type Action =
  | setModeIdleAction
  | setModeAddAction
  | setModeDeleteAction
  | AddPointAction
  | DeletePolygonAction;
