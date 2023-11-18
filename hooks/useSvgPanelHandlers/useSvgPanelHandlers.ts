import { Action, State } from '#/types/state/polygons';
import { useCallback, useRef } from 'react';
import {
  addPoint,
  addVertexToSide,
  removePolygon,
  removeVertex,
  removeSide,
} from './clickHandlers';
import { initializeGParentElement } from './initializeGParentElement';
import { moveVertexInitializer } from './mouseDownHandlers';
import { DragHelpers, PointsHelpers, SvgElements } from './types';
import { movePolygon, moveVertex } from './mouseMoveHandlers';
import { initializeDragFunctionality } from './initializeDragFunctionality';
import {
  cleanUpRefs,
  movePolygonCommit,
  moveVertexCommit,
} from './mouseUpHandlers';

export const useSvgPanelHandlers = (
  state: State,
  dispatch: React.Dispatch<Action>
) => {
  const handleClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      if (state.mode === 'add-polygon') {
        addPoint(event, dispatch);
      } else if (state.mode === 'remove-polygon') {
        removePolygon(event, dispatch);
      } else if (state.mode === 'add-vertex-to-side') {
        addVertexToSide(event, dispatch);
      } else if (state.mode === 'remove-vertex') {
        removeVertex(event, dispatch);
      } else if (state.mode === 'remove-side') {
        removeSide(event, dispatch);
      }
    },
    [state]
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

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      const target = event.target as SVGElement;
      if (state.mode === 'move-polygon') {
        if (target.tagName === 'polygon') {
          initializeGParentElement(target, elements.current);
          initializeDragFunctionality(event, dragHelpers.current);
        }
      } else if (state.mode === 'move-vertex') {
        if (target.tagName === 'circle') {
          initializeGParentElement(target, elements.current);
          moveVertexInitializer(
            event,
            state,
            elements.current,
            pointsHelpers.current
          );
          initializeDragFunctionality(event, dragHelpers.current);
        }
      }
    },
    [state]
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      if (!dragHelpers.current.isDragging) {
        return;
      }

      if (state.mode === 'move-polygon') {
        movePolygon(event, elements.current, dragHelpers.current);
      } else if (state.mode === 'move-vertex') {
        moveVertex(
          event,
          elements.current,
          pointsHelpers.current,
          dragHelpers.current
        );
      }
    },
    [state]
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      dragHelpers.current.isDragging = false;
      const target = event.target as SVGElement;

      if (state.mode === 'move-polygon') {
        movePolygonCommit(
          state,
          dispatch,
          elements.current,
          dragHelpers.current
        );
      } else if (state.mode === 'move-vertex') {
        moveVertexCommit(
          dispatch,
          elements.current,
          pointsHelpers.current,
        );
      }
      cleanUpRefs(elements.current, pointsHelpers.current, dragHelpers.current);
    },
    [state]
  );

  return {
    svgPanelClickHandler: handleClick,
    svgPanelMouseDownHandler: handleMouseDown,
    svgPanelMouseMoveHandler: handleMouseMove,
    svgPanelMouseUpHandler: handleMouseUp,
  };
};
