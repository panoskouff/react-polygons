import { SvgElements, PointsHelpers, DragHelpers } from '../types';

export const cleanUpRefs = (
  elements: SvgElements,
  pointsHelpers: PointsHelpers,
  dragHelpers: DragHelpers
) => {
  elements.g = null;
  elements.polygon = null;
  elements.nextLine = null;
  elements.prevLine = null;
  elements.circle = null;

  pointsHelpers.polygonPoints = null;
  pointsHelpers.circleVertexIndex = null;
  pointsHelpers.circleInitialPosition = null;

  dragHelpers.isDragging = false;
  dragHelpers.lastPosition = { x: 0, y: 0 };
  dragHelpers.dragOffset = { x: 0, y: 0 };
};
