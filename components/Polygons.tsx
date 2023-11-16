// import { Row, Text } from '#/atoms';
import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';

export const Polygons: React.FC = () => {
  const { state, dispatch } = usePolygonsContext();
  const polygonKeys = Object.keys(state.polygons ?? {});

  // @todo fix keys
  return (
    <>
      {polygonKeys.map((polygonKey) => {
        const polygon = state?.polygons?.[polygonKey];
        if (!polygon) {
          return null;
        }
        const points = polygon.points.map((point) => {
          return `${point.x},${point.y}`;
        });
        const pointsString = points.join(' ');

        return (
          <g data-polygonId={polygonKey}>
            {polygon.isComplete && (
              <polygon
                key={polygonKey}
                points={pointsString}
                style={{
                  fill: 'lime',
                  stroke: 'purple',
                  strokeWidth: 1,
                }}
              />
            )}

            {polygon.points.map((point, index) => {
              const nextPoint = polygon.points[index + 1];
              if (nextPoint) {
                return (
                  <line
                    key={`${polygonKey}-line-${index}`}
                    x1={point.x}
                    y1={point.y}
                    x2={nextPoint.x}
                    y2={nextPoint.y}
                    stroke='black'
                  />
                );
              }
            })}
            {polygon.points.map((point, index) => {
              if (index === polygon.points.length - 1 && polygon.isComplete) {
                // last point is the same as first point if completed
                return null;
              }
              return (
                <circle
                  key={`${polygonKey}-point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r='5'
                  stroke='black'
                  strokeWidth='3'
                  fill='red'
                />
              );
            })}
          </g>
        );
      })}
      ;
    </>
  );
};
