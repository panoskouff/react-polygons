import { Action } from '#/types/state/polygons';
import { DragHelpers, PointsHelpers, SvgElements } from '../types';

export const moveVertexCommit = (
  dispatch: React.Dispatch<Action>,
  elements: SvgElements,
  pointsHelpers: PointsHelpers,
  dragHelpers: DragHelpers
) => {
  const polygonId = elements.g?.getAttribute('data-polygon-id');
  if (
    !pointsHelpers.polygonPoints ||
    (!pointsHelpers.circleVertexIndex &&
      pointsHelpers.circleVertexIndex !== 0) ||
    !pointsHelpers.circleInitialPosition ||
    !polygonId
  ) {
    console.error(
      'handleMouseUp moveVertexCommit: Missing ref(s) or polygonId'
    );
  } else {
    const newPoint = {
      x: pointsHelpers.circleInitialPosition.x + dragHelpers.dragOffset.x,
      y: pointsHelpers.circleInitialPosition.y + dragHelpers.dragOffset.y,
    };

    pointsHelpers.polygonPoints[pointsHelpers.circleVertexIndex] = newPoint;
    if (pointsHelpers.circleVertexIndex === 0) {
      /* first and last point are always the
          same to complete the polygon */
      pointsHelpers.polygonPoints[pointsHelpers.polygonPoints.length - 1] =
        newPoint;
    }
    const newPoints = [...pointsHelpers.polygonPoints];

    dispatch({
      type: 'EDIT_POLYGON_POINTS',
      payload: { polygonId, points: newPoints },
    });
  }
};
