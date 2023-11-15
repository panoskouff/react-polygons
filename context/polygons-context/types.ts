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

export type setModeIdleAction = { type: 'SET_MODE_IDLE' };
export type setModeAddAction = { type: 'SET_MODE_ADD' };

export type AddPointAction = {
  type: 'ADD_POINT';
  payload: { point: { x: number; y: number }; clickedOnPoint: boolean };
};

export type Action = setModeIdleAction | setModeAddAction | AddPointAction;
