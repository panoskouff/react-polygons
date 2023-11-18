import { calculatePointsDragOffset } from '../calculatePointsDragOffset';
import { DragHelpers, SvgElements } from '../types';

export const movePolygon = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  elements: SvgElements,
  dragHelpers: DragHelpers
) => {
  if (!elements.g) {
    console.error('handleMouseMove movePolygon: Missing element <g>');
    return;
  }

  requestAnimationFrame(() => {
    if (elements.g) {
      calculatePointsDragOffset(event, dragHelpers);

      if (dragHelpers.isDragging) {
        elements.g.setAttribute(
          'transform',
          `translate(${dragHelpers.dragOffset.x}, ${dragHelpers.dragOffset.y})`
        );
      }
    }
  });
};
