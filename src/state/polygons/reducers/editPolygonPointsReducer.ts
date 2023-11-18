import { EditPolygonPointsAction, State } from '#/types/state/polygons';

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
