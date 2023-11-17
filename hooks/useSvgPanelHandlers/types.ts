import { Point } from '#/types';

export type SvgElements = {
  g: SVGGElement | null;
  polygon: SVGPolygonElement | null;
  prevLine: SVGLineElement | null;
  nextLine: SVGLineElement | null;
  circle: SVGCircleElement | null;
};

export type PointsHelpers = {
  circleInitialPosition: Point | null;
  circleVertexIndex: number | null;
  polygonPoints: Point[] | null;
};

export type DragHelpers = {
  isDragging: boolean;
  dragOffset: Point;
  lastPosition: Point;
};
