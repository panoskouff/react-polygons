import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { styled } from '#/styled-system/jsx';

export const Polygons: React.FC = () => {
  const { state } = usePolygonsContext();
  const polygonKeys = Object.keys(state.polygons ?? {});

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
          <styled.g data-polygonId={polygonKey}>
            {polygon.isComplete && (
              <styled.polygon
                key={polygonKey}
                points={pointsString}
                fill='#26e972e8'
                _hover={{
                  _stateMovePolygon: {
                    cursor: 'grab',
                  },
                  _stateRemovePolygon: {
                    fill: '#ff0202c9',
                    cursor: 'crosshair',
                  },
                }}
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
                    stroke={'#232323'}
                    strokeWidth='5'
                    opacity={{
                      base: 1,
                    }}
                    transition='stroke 0.3s '
                    _hover={{
                      _stateAddVertexToSide: {
                        cursor: 'pointer',
                        stroke: '#e654ff',
                      },
                      _stateRemoveSide: {
                        stroke: '#ff0202c9',
                        cursor: 'crosshair',
                      },
                    }}
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
                  data-vertex-index={index}
                  key={`${polygonKey}-point-${index}`}
                  cx={point.x}
                  cy={point.y}
                  r='5'
                  stroke='black'
                  strokeWidth='3'
                  fill='orangered'
                  transition='stroke 0.3s '
                  _hover={{
                    _stateMoveVertex: {
                      cursor: 'pointer',
                    },
                    _stateRemoveVertex: {
                      stroke: '#ff0202c9',
                      cursor: 'crosshair',
                    },
                  }}
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
