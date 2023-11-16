import { AddVertexToSideAction, State } from '#/types/state/polygons';

export const addVertexToSideReducer = (
  state: State,
  action: AddVertexToSideAction
): State => {
  const { polygonId, prevPoint, newPoint } = action.payload;

  const prevPointIndex = state.polygons?.[polygonId]?.points?.findIndex(
    (point) => point.x === prevPoint.x && point.y === prevPoint.y
  );

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
