import { Action, State } from '#/types/state/polygons';
import { useCallback, useRef } from 'react';
import {
  addPoint,
  addVertexToSide,
  removePolygon,
  removeVertex,
  removeSide,
} from './clickHandlers';
import { Point } from '#/types';
import { initializeGParentElementRef } from './initializeGParentElementRef';
import { moveVertexInitializer } from './mouseDownHandlers';
import { DragHelpers, PointsHelpers, SvgElements } from './types';

export const useSvgPanelHandlers = (
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  const handleClick = useCallback(
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

  const elements = useRef<SvgElements>({
    g: null,
    polygon: null,
    prevLine: null,
    nextLine: null,
    circle: null,
  });

  const pointsHelpers = useRef<PointsHelpers>({
    circleInitialPosition: null,
    circleVertexIndex: null,
    polygonPoints: null,
  });

  const dragHelpers = useRef<DragHelpers>({
    isDragging: false,
    dragOffset: { x: 0, y: 0 },
    lastPosition: { x: 0, y: 0 },
  });

  const initializeDragFunctionality = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      dragHelpers.current.lastPosition = { x: event.clientX, y: event.clientY };
      dragHelpers.current.isDragging = true;
    },
    []
  );

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      const target = event.target as SVGElement;
      if (state.mode === 'move-polygon') {
        if (target.tagName === 'polygon') {
          initializeGParentElementRef(target, elements.current);
          initializeDragFunctionality(event);
        }
      } else if (state.mode === 'move-vertex') {
        if (target.tagName === 'circle') {
          initializeGParentElementRef(target, elements.current);
          moveVertexInitializer(
            event,
            state,
            elements.current,
            pointsHelpers.current
          );
          initializeDragFunctionality(event);
        }
      }
    },
    [state, initializeDragFunctionality]
  );

  return {
    svgPanelClickHandler: handleClick,
    svgPanelMouseDownHandler: handleMouseDown,
  };
};
