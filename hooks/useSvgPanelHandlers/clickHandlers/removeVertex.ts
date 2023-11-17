import { Action, State } from '#/types/state/polygons';

export const removeVertex = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  const target = event.target as SVGElement;
  if (target.tagName === 'circle') {
    const polygonId = target.parentElement?.getAttribute('data-polygonId');
    if (!polygonId) {
      console.error('svgClickHandler: Missing polygonId');
      return;
    }
    const x = target.getAttribute('cx');
    const y = target.getAttribute('cy');
    if (!x || !y) {
      // here to satisfy typescript - this should never happen
      console.error('svgClickHandler: Missing x or y');
      return;
    }
    const point = { x: parseInt(x), y: parseInt(y) };
    dispatch({
      type: 'REMOVE_VERTEX',
      payload: { polygonId, point },
    });
  }
};
