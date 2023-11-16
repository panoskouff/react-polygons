import { Point } from '#/types';

export const findIndexOfPoint = (
  points: Point[],
  pointToFind: Point
): number => {
  return points.findIndex(
    (point) => point.x === pointToFind.x && point.y === pointToFind.y
  );
};
