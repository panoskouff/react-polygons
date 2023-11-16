// import { Row, Text } from '#/atoms';
import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { styled } from '#/styled-system/jsx';

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
          <styled.g data-polygonId={polygonKey} role='group'>
            {polygon.isComplete && (
              <styled.polygon
                key={polygonKey}
                points={pointsString}
                fill='#46ff00'
                stroke='#d282f3'
                strokeWidth='2'
              />
            )}
            {polygon.points.map((point, index) => {
              const nextPoint = polygon.points[index + 1];
              if (nextPoint) {
                return (
                  <styled.line
                    key={`${polygonKey}-line-${index}`}
                    x1={point.x}
                    y1={point.y}
                    x2={nextPoint.x}
                    y2={nextPoint.y}
                    stroke='#256eff'
                    strokeWidth='5'
                    opacity={{ base: '0', _groupHover: '1' }}
                    transition='opacity 0.6s'
                    _hover={{ cursor: 'pointer' }}
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
                <styled.circle
                  key={`${polygonKey}-point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r='5'
                  stroke='black'
                  strokeWidth='3'
                  fill='orangered'
                />
              );
            })}
          </styled.g>
        );
      })}
      ;
    </>
  );
};
