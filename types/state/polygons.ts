import { Point } from '../geometry';

export type State = {
  mode:
    | 'idle'
    | 'add-polygon'
    | 'move-polygon'
    | 'remove-polygon'
    | 'add-vertex-to-side';
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
export type setModeAddPolygonAction = { type: 'SET_MODE_ADD_POLYGON' };
export type setModeAddVertexToSideAction = {
  type: 'SET_MODE_ADD_VERTEX_TO_SIDE';
};
export type setModeRemovePolygonAction = { type: 'SET_MODE_REMOVE_POLYGON' };
export type setModeMovePolygonAction = { type: 'SET_MODE_MOVE_POLYGON' };

export type AddPointAction = {
  type: 'ADD_POINT';
  payload: { point: Point; clickedOnPoint: boolean };
};

export type EditPolygonPointsAction = {
  type: 'EDIT_POLYGON_POINTS';
  payload: { polygonId: string; points: Point[] };
};

export type DeletePolygonAction = {
  type: 'REMOVE_POLYGON';
  payload: { polygonId: string };
};

export type AddVertexToSideAction = {
  type: 'ADD_VERTEX_TO_SIDE';
  payload: { polygonId: string; prevPoint: Point; newPoint: Point };
};

export type Action =
  | setModeIdleAction
  | setModeAddPolygonAction
  | setModeRemovePolygonAction
  | setModeMovePolygonAction
  | setModeAddVertexToSideAction
  | AddPointAction
  | AddVertexToSideAction
  | EditPolygonPointsAction
  | DeletePolygonAction;
