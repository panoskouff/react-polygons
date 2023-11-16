import { Point } from '#/types';
import { RemoveVertexAction, State } from '#/types/state/polygons';
import { findIndexOfPoint } from '#/utils';

export const removeVertexReducer = (
  state: State,
  action: RemoveVertexAction
): State => {
  const { polygonId } = action.payload;
  const points = state.polygons?.[polygonId]?.points;

  /* if polygon has 3 sides ie 4 points (1st is repeated
    at the end of array), remove the polygon since we don't
    have enough vertexes to form a polygon anymore */

  if (points.length === 4) {
    const { [polygonId]: _, ...restPolygons } = state.polygons;
    return {
      ...state,
      polygons: restPolygons,
    };
  }

  const pointToRemoveIndex = findIndexOfPoint(points, action.payload.point);

  if (pointToRemoveIndex === -1) {
    // should never happen
    console.error('removeVertexReducer: pointToRemoveIndex is -1');
    return state;
  }

  let newPoints: Point[] = [];
  if (pointToRemoveIndex === 0) {
    /*  we need to handle the first and last
    point so the polygon completes appropriately  */
    newPoints = [
      // remove first and last element
      ...points?.slice(1, points.length - 1),
      /* old 2nd is new first so add it also as last to
        complete the polygon */
      points?.[1],
    ];
  } else {
    newPoints = [
      ...points?.slice(0, pointToRemoveIndex),
      ...points?.slice(pointToRemoveIndex + 1),
    ];
  }

  return {
    ...state,
    polygons: {
      ...state.polygons,
      [polygonId]: {
        ...state.polygons?.[polygonId],
        points: newPoints,
      },
    },
  };
};
