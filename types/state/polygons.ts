export type State = {
  mode: 'idle' | 'add-polygon' | 'move-polygon' | 'remove-polygon';
  selectedPolygon: string | null;
  polygons: {
    [key: string]: {
      isComplete: boolean;
      points: {
        x: number;
        y: number;
      }[];
    };
  };
};

export type setModeIdleAction = { type: 'SET_MODE_IDLE' };
export type setModeAddAction = { type: 'SET_MODE_ADD_POLYGON' };
export type setModeDeleteAction = { type: 'SET_MODE_REMOVE_POLYGON' };
export type setModeMoveAction = { type: 'SET_MODE_MOVE_POLYGON' };

export type AddPointAction = {
  type: 'ADD_POINT';
  payload: { point: { x: number; y: number }; clickedOnPoint: boolean };
};

export type EditPolygonPointsAction = {
  type: 'EDIT_POLYGON_POINTS';
  payload: { polygonId: string; points: { x: number; y: number }[] };
};

export type DeletePolygonAction = {
  type: 'REMOVE_POLYGON';
  payload: { polygonId: string };
};

export type Action =
  | setModeIdleAction
  | setModeAddAction
  | setModeDeleteAction
  | setModeMoveAction
  | AddPointAction
  | EditPolygonPointsAction
  | DeletePolygonAction;
