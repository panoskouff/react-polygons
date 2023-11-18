import { Action, State } from '#/types/state/polygons';
import { DragHelpers, SvgElements } from '../types';

export const movePolygonCommit = (
  state: State,
  dispatch: React.Dispatch<Action>,
  elements: SvgElements,
  dragHelpers: DragHelpers
) => {
  const polygonId = elements.g?.getAttribute('data-polygon-id');
  if (!elements.g || !polygonId) {
    console.error(
      'handleMouseUp movePolygonCommit: Missing ref(s) or polygonId'
    );
    return;
  }

  const polygonPoints = state.polygons[polygonId].points;
  const newPoints = polygonPoints.map((point) => ({
    x: point.x + dragHelpers.dragOffset.x,
    y: point.y + dragHelpers.dragOffset.y,
  }));

  dispatch({
    type: 'EDIT_POLYGON_POINTS',
    payload: { polygonId, points: newPoints },
  });

  elements.g.setAttribute('transform', `translate(0, 0)`);
};
