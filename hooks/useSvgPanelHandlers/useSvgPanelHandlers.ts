import { Action, State } from '#/types/state/polygons';
import { useCallback, useRef } from 'react';
import {
  addPoint,
  addVertexToSide,
  removePolygon,
  removeVertex,
  removeSide,
} from './clickHandlers';
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

  const calculatePointsDragOffset = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      const deltaX = event.clientX - dragHelpers.current.lastPosition.x;
      const deltaY = event.clientY - dragHelpers.current.lastPosition.y;

      dragHelpers.current.dragOffset = {
        x: dragHelpers.current.dragOffset.x + deltaX,
        y: dragHelpers.current.dragOffset.y + deltaY,
      };
      dragHelpers.current.lastPosition = { x: event.clientX, y: event.clientY };
    },
    []
  );

  const handleMouseMove = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      if (!dragHelpers.current.isDragging) {
        return;
      }

      if (state.mode === 'move-polygon') {
        if (!elements.current.g) return;
        requestAnimationFrame(() => {
          if (elements.current.g) {
            calculatePointsDragOffset(event);

            elements.current.g.setAttribute(
              'transform',
              `translate(${dragHelpers.current.dragOffset.x}, ${dragHelpers.current.dragOffset.y})`
            );
          }
        });
      } else if (state.mode === 'move-vertex') {
        if (
          !elements.current.circle ||
          (!pointsHelpers.current.circleVertexIndex &&
            pointsHelpers.current.circleVertexIndex !== 0) ||
          !pointsHelpers.current.polygonPoints
        ) {
          console.error('handleMouseMove: Missing ref(s)');
          return;
        }

        const polygonPoints = pointsHelpers.current.polygonPoints;
        requestAnimationFrame(() => {
          if (
            !pointsHelpers.current.circleInitialPosition ||
            !pointsHelpers.current.circleInitialPosition.x ||
            !pointsHelpers.current.circleInitialPosition.y
          ) {
            console.error(
              'handleMouseMove: requestAnimationFrame: Missing ref(s)'
            );
            return;
          }

          calculatePointsDragOffset(event);

          const newPoint = {
            x:
              pointsHelpers.current.circleInitialPosition.x +
              dragHelpers.current.dragOffset.x,
            y:
              pointsHelpers.current.circleInitialPosition.y +
              dragHelpers.current.dragOffset.y,
          };

          const newPolygonPoints = polygonPoints.reduce((acc, point, index) => {
            if (index === pointsHelpers.current.circleVertexIndex) {
              return `${acc} ${newPoint.x},${newPoint.y}`;
            } else if (index === polygonPoints.length - 1) {
              return acc;
            }
            return `${acc} ${point.x},${point.y}`;
          }, '');

          elements.current.circle?.setAttribute('cx', newPoint.x.toString());
          elements.current.circle?.setAttribute('cy', newPoint.y.toString());
          elements.current.nextLine?.setAttribute('x1', newPoint.x.toString());
          elements.current.nextLine?.setAttribute('y1', newPoint.y.toString());
          elements.current.prevLine?.setAttribute('x2', newPoint.x.toString());
          elements.current.prevLine?.setAttribute('y2', newPoint.y.toString());
          elements.current.polygon?.setAttribute('points', newPolygonPoints);
        });
      }
    },
    [state, calculatePointsDragOffset]
  );

  const handleMouseUp = useCallback(
    (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      // no early returns here so we do proper cleanup
      const polygonId = elements.current.g?.getAttribute('data-polygonId');
      dragHelpers.current.isDragging = false;

      if (state.mode === 'move-polygon') {
        if (!elements.current.g || !polygonId) {
          console.error('handleMouseUp: Missing ref(s) or polygonId');
        } else {
          const polygonPoints = state.polygons[polygonId].points;
          const newPoints = polygonPoints.map((point) => {
            return {
              x: point.x + dragHelpers.current.dragOffset.x,
              y: point.y + dragHelpers.current.dragOffset.y,
            };
          });
          dispatch({
            type: 'EDIT_POLYGON_POINTS',
            payload: { polygonId, points: newPoints },
          });
          elements.current.g.setAttribute('transform', `translate(0, 0)`);
        }
      } else if (state.mode === 'move-vertex') {
        if (
          !pointsHelpers.current.polygonPoints ||
          (!pointsHelpers.current.circleVertexIndex &&
            pointsHelpers.current.circleVertexIndex !== 0) ||
          !pointsHelpers.current.circleInitialPosition ||
          !polygonId
        ) {
          console.error('handleMouseUp: Missing ref(s) or polygonId');
        } else {
          const newPoint = {
            x:
              pointsHelpers.current.circleInitialPosition.x +
              dragHelpers.current.dragOffset.x,
            y:
              pointsHelpers.current.circleInitialPosition.y +
              dragHelpers.current.dragOffset.y,
          };

          pointsHelpers.current.polygonPoints[
            pointsHelpers.current.circleVertexIndex
          ] = newPoint;
          if (pointsHelpers.current.circleVertexIndex === 0) {
            /* first and last point are always the
                same to complete the polygon */
            pointsHelpers.current.polygonPoints[
              pointsHelpers.current.polygonPoints.length - 1
            ] = newPoint;
          }
          const newPoints = [...pointsHelpers.current.polygonPoints];

          dispatch({
            type: 'EDIT_POLYGON_POINTS',
            payload: { polygonId, points: newPoints },
          });
        }
      }

      elements.current.circle = null;
      elements.current.nextLine = null;
      elements.current.prevLine = null;
      elements.current.polygon = null;
      pointsHelpers.current.polygonPoints = null;
      pointsHelpers.current.circleVertexIndex = null;
      elements.current.g = null;
      dragHelpers.current.dragOffset = { x: 0, y: 0 };
    },
    [state, dispatch]
  );

  return {
    svgPanelClickHandler: handleClick,
    svgPanelMouseDownHandler: handleMouseDown,
    svgPanelMouseMoveHandler: handleMouseMove,
    svgPanelMouseUpHandler: handleMouseUp,
  };
};
