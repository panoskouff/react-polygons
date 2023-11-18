import { Action } from '#/types/state/polygons';
import { DragHelpers, PointsHelpers, SvgElements } from '../types';

export const moveVertexCommit = (
  dispatch: React.Dispatch<Action>,
  elements: SvgElements,
  pointsHelpers: PointsHelpers
) => {
  const polygonId = elements.g?.getAttribute('data-polygon-id');
  if (!pointsHelpers.polygonPoints || !polygonId) {
    console.warn('handleMouseUp moveVertexCommit: Missing ref(s) or polygonId');
    return;
  }
  /* pointsHelpers.polygonPoints already contains the
    most updated points calculated from mouseMove handler */
  const newPoints = [...pointsHelpers.polygonPoints];

  dispatch({
    type: 'EDIT_POLYGON_POINTS',
    payload: { polygonId, points: newPoints },
  });
};
