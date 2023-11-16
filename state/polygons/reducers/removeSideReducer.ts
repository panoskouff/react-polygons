import { Point } from '#/types';
import { RemoveSideAction, State } from '#/types/state/polygons';
import { findIndexOfPoint } from '#/utils';

export const removeSideReducer = (
  state: State,
  action: RemoveSideAction
): State => {
  const { polygonId } = action.payload;
  const points = state.polygons?.[polygonId]?.points;

  /* if polygon has 4 sides ie 5 points (1st is repeated
    at the end of array), remove the polygon since we don't
    have enough vertexes to form a polygon anymore.
    (Since we will be removing the 2 points that form the side) */

  if (points.length <= 5) {
    const { [polygonId]: _, ...restPolygons } = state.polygons;
    return {
      ...state,
      polygons: restPolygons,
    };
  }

  const firstPointToRemoveIndex = findIndexOfPoint(
    points,
    action.payload.point1
  );

  if (firstPointToRemoveIndex === -1) {
    // should never happen
    console.error("removeSideReducer: couldn't find point in points");
    return state;
  }

  let newPoints: Point[] = [];
  if (firstPointToRemoveIndex === 0) {
    /*  we need to handle the first and last
    point so the polygon completes appropriately  */
    newPoints = [
      // remove first and last element
      ...points?.slice(2, points.length - 1),
      /* old 3rd is new first so add it also as last to
        complete the polygon */
      points?.[2],
    ];
  } else if (firstPointToRemoveIndex === points.length - 2) {
    /* if our side is the last side, we also need to handle
      the first and last point, because the last one is the
      same as the first one */
    newPoints = [...points?.slice(1, points.length - 2), points?.[1]];
  } else {
    newPoints = [
      ...points?.slice(0, firstPointToRemoveIndex),
      ...points?.slice(firstPointToRemoveIndex + 2),
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
