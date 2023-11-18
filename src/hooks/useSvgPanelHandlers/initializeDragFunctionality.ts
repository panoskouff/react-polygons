import { DragHelpers } from './types';

export const initializeDragFunctionality = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  dragHelpers: DragHelpers
) => {
  dragHelpers.lastPosition = { x: event.clientX, y: event.clientY };
  dragHelpers.isDragging = true;
};
