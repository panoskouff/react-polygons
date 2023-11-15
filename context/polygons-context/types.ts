export type State = {
  mode: 'idle' | 'add';
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

export type AddPointAction = {
  type: 'ADD_POINT';
  payload: { point: { x: number; y: number }; clickedOnPoint: boolean };
};

export type Action =
  | { type: 'SET_MODE_IDLE' | 'SET_MODE_ADD' }
  | AddPointAction;
