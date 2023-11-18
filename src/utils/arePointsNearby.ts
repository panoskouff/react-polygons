import { Point } from '#/types';
import { euclideanDistance } from './euclideanDistance';

export const arePointsNearby = (
  point1: Point,
  point2: Point,
  tolerance: number
): boolean => {
  return euclideanDistance(point1, point2) <= tolerance;
};
