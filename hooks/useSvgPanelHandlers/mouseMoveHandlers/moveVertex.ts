import { calculatePointsDragOffset } from '../calculatePointsDragOffset';
import { DragHelpers, PointsHelpers, SvgElements } from '../types';

export const moveVertex = (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  elements: SvgElements,
  pointsHelpers: PointsHelpers,
  dragHelpers: DragHelpers
) => {
  if (
    !pointsHelpers.polygonPoints ||
    !pointsHelpers.circleInitialPosition ||
    (!pointsHelpers.circleVertexIndex && pointsHelpers.circleVertexIndex !== 0)
  ) {
    console.error('handleMouseMove moveVertex: Missing ref(s)');
    return;
  }

  calculatePointsDragOffset(event, dragHelpers);

  const newPoint = {
    x: pointsHelpers.circleInitialPosition.x + dragHelpers.dragOffset.x,
    y: pointsHelpers.circleInitialPosition.y + dragHelpers.dragOffset.y,
  };

  /* we could have this calculation in the commit function
    but either way we need it here to produce the polygon str */
  pointsHelpers.polygonPoints[pointsHelpers.circleVertexIndex] = newPoint;
  if (pointsHelpers.circleVertexIndex === 0) {
    /* first and last point are always the
          same to complete the polygon */
    pointsHelpers.polygonPoints[pointsHelpers.polygonPoints.length - 1] =
      newPoint;
  }

  const newPolygonPointsStr = pointsHelpers.polygonPoints.reduce(
    (acc, point, index) => {
      if (index === 0) {
        return `${point.x},${point.y}`;
      } else {
        return `${acc} ${point.x},${point.y}`;
      }
    },
    ''
  );

  requestAnimationFrame(() => {
    elements.circle?.setAttribute('cx', newPoint.x.toString());
    elements.circle?.setAttribute('cy', newPoint.y.toString());
    elements.nextLine?.setAttribute('x1', newPoint.x.toString());
    elements.nextLine?.setAttribute('y1', newPoint.y.toString());
    elements.prevLine?.setAttribute('x2', newPoint.x.toString());
    elements.prevLine?.setAttribute('y2', newPoint.y.toString());
    elements.polygon?.setAttribute('points', newPolygonPointsStr);
  });
};
