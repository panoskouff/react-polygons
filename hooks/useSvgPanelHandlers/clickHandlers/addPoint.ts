import { Action, State } from '#/types/state/polygons';

export const addPoint = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  const target = event.target as SVGElement;

  if (target.tagName === 'svg' || target.tagName === 'circle') {
    dispatch({
      type: 'ADD_POINT',
      payload: {
        point: { x: event.clientX, y: event.clientY },
        clickedOnPoint: target.tagName === 'circle',
      },
    });
  }
};
