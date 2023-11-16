import { AddVertexToSideAction, State } from '#/types/state/polygons';
import { findIndexOfPoint } from '#/utils';

export const addVertexToSideReducer = (
  state: State,
  action: AddVertexToSideAction
): State => {
  const { polygonId, prevPoint, newPoint } = action.payload;

  const prevPointIndex = findIndexOfPoint(
    state.polygons?.[polygonId]?.points,
    prevPoint
  );

  if (prevPointIndex === -1) {
    // should never happen
    console.error('addVertexToSideReducer: prevPointIndex is -1');
    return state;
  }

  return {
    ...state,
    polygons: {
      ...state.polygons,
      [polygonId]: {
        ...state.polygons?.[polygonId],
        points: [
          ...state.polygons?.[polygonId]?.points?.slice(0, prevPointIndex + 1),
          newPoint,
          ...state.polygons?.[polygonId]?.points?.slice(prevPointIndex + 1),
        ],
      },
    },
  };
};
