import { EditPolygonPointsAction, State } from '../types';

export const editPolygonPointsReducer = (
  state: State,
  action: EditPolygonPointsAction
): State => {
  return {
    ...state,
    polygons: {
      ...state.polygons,
      [action.payload.polygonId]: {
        ...state.polygons?.[action.payload.polygonId],
        points: action.payload.points,
      },
    },
  };
};
