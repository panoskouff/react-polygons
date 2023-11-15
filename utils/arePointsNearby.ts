type Point = { x: number; y: number };

export const arePointsNearby = (
  point1: Point,
  point2: Point,
  tolerance: number
): boolean => {
  const distance = Math.sqrt(
    Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
  );

  console.log('🔥', distance, tolerance, distance <= tolerance);

  return distance <= tolerance;
};
