import { Action } from '#/types/state/polygons';

export const removeSide = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  dispatch: React.Dispatch<Action>
) => {
  const target = event.target as SVGElement;
  if (target.tagName === 'line') {
    const polygonId = target.parentElement?.getAttribute('data-polygon-id');
    if (!polygonId) {
      console.error('svgClickHandler removeSide: Missing polygonId');
      return;
    }
    const x1 = target.getAttribute('x1');
    const y1 = target.getAttribute('y1');
    const x2 = target.getAttribute('x2');
    const y2 = target.getAttribute('y2');
    if (!x1 || !y1 || !x2 || !y2) {
      // here to satisfy typescript - this should never happen
      console.error('svgClickHandler removeSide: Missing Points of line');
      return;
    }
    const point1 = { x: parseInt(x1), y: parseInt(y1) };
    const point2 = { x: parseInt(x2), y: parseInt(y2) };
    dispatch({
      type: 'REMOVE_SIDE',
      payload: { polygonId, point1, point2 },
    });
  }
};
