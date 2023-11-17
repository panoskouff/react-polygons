import { Action } from '#/types/state/polygons';

export const removePolygon = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  dispatch: React.Dispatch<Action>
) => {
  const target = event.target as SVGElement;
  if (target.tagName === 'polygon') {
    const polygonId = target.parentElement?.getAttribute('data-polygon-id');
    if (!polygonId) {
      console.error('svgClickHandler removePolygon: Missing polygonId');
      return;
    }

    dispatch({
      type: 'REMOVE_POLYGON',
      payload: { polygonId },
    });
  }
};
