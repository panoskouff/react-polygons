import { DragHelpers } from './types';

export const calculatePointsDragOffset = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  dragHelpers: DragHelpers
) => {
  const deltaX = event.clientX - dragHelpers.lastPosition.x;
  const deltaY = event.clientY - dragHelpers.lastPosition.y;

  dragHelpers.dragOffset = {
    x: dragHelpers.dragOffset.x + deltaX,
    y: dragHelpers.dragOffset.y + deltaY,
  };
  dragHelpers.lastPosition = { x: event.clientX, y: event.clientY };
};
