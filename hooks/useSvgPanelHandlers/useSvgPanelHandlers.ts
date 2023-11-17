import { Action, State } from '#/types/state/polygons';
import React from 'react';
import {
  addPoint,
  addVertexToSide,
  removePolygon,
  removeVertex,
  removeSide,
} from './clickHandlers';

export const useSvgPanelHandlers = (
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  const handleClick = React.useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      if (state.mode === 'add-polygon') {
        addPoint(event, state, dispatch);
      } else if (state.mode === 'remove-polygon') {
        removePolygon(event, state, dispatch);
      } else if (state.mode === 'add-vertex-to-side') {
        addVertexToSide(event, state, dispatch);
      } else if (state.mode === 'remove-vertex') {
        removeVertex(event, state, dispatch);
      } else if (state.mode === 'remove-side') {
        removeSide(event, state, dispatch);
      }
    },
    [state, dispatch]
  );

  return { SvgPanelClickHandler: handleClick };
};
