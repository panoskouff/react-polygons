import { Action, State } from '#/types/state/polygons';

export const removePolygon = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  const target = event.target as SVGElement;
  if (target.tagName === 'polygon') {
    const polygonId = target.parentElement?.getAttribute('data-polygonId');
    if (!polygonId) {
      console.error('svgClickHandler: Missing polygonId');
      return;
    }

    dispatch({
      type: 'REMOVE_POLYGON',
      payload: { polygonId },
    });
  }
};
