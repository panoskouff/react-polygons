import { calculatePointsDragOffset } from '../calculatePointsDragOffset';
import { DragHelpers, PointsHelpers, SvgElements } from '../types';

export const moveVertex = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  elements: SvgElements,
  pointsHelpers: PointsHelpers,
  dragHelpers: DragHelpers
) => {
  if (!pointsHelpers.polygonPoints) {
    console.error('handleMouseMove moveVertex: Missing ref(s)');
    return;
  }

  const polygonPoints = pointsHelpers.polygonPoints;
  requestAnimationFrame(() => {
    if (!pointsHelpers.circleInitialPosition) {
      console.error(
        'handleMouseMove moveVertex: requestAnimationFrame: Missing ref(s)'
      );
      return;
    }

    calculatePointsDragOffset(event, dragHelpers);

    const newPoint = {
      x: pointsHelpers.circleInitialPosition.x + dragHelpers.dragOffset.x,
      y: pointsHelpers.circleInitialPosition.y + dragHelpers.dragOffset.y,
    };

    const newPolygonPoints = polygonPoints.reduce((acc, point, index) => {
      if (index === pointsHelpers.circleVertexIndex) {
        return `${acc} ${newPoint.x},${newPoint.y}`;
      } else if (index === polygonPoints.length - 1) {
        return acc;
      }
      return `${acc} ${point.x},${point.y}`;
    }, '');

    elements.circle?.setAttribute('cx', newPoint.x.toString());
    elements.circle?.setAttribute('cy', newPoint.y.toString());
    elements.nextLine?.setAttribute('x1', newPoint.x.toString());
    elements.nextLine?.setAttribute('y1', newPoint.y.toString());
    elements.prevLine?.setAttribute('x2', newPoint.x.toString());
    elements.prevLine?.setAttribute('y2', newPoint.y.toString());
    elements.polygon?.setAttribute('points', newPolygonPoints);
  });
};
