import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { styled } from '#/styled-system/jsx';
import { useMemo } from 'react';
import { SvgCircle } from './SvgCircle';
import { SvgLine } from './SvgLine';
import { SvgPolygon } from './SvgPolygon';
import { State } from '#/types/state/polygons';

type PolygonComponentProps = {
  polygonKey: string;
  polygon: State['polygons'][string];
};

const PolygonComponent: React.FC<PolygonComponentProps> = ({
  polygonKey,
  polygon,
}) => {
  const pointsString = useMemo(
    () => polygon.points.map((point) => `${point.x},${point.y}`).join(' '),
    [polygon.points]
  );

  return (
    <styled.g data-polygon-id={polygonKey}>
      {polygon.isComplete && (
        <SvgPolygon key={`${polygonKey}-polygon`} points={pointsString} />
      )}
      {polygon.points.map((point, index) => {
        const nextPoint = polygon.points[index + 1];
        if (nextPoint) {
          return (
            <SvgLine
              key={`${polygonKey}-line-${index}`}
              pointStart={point}
              pointEnd={nextPoint}
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
          <SvgCircle
            key={`${polygonKey}-point-${index}`}
            point={point}
            vertexIndex={index}
          />
        );
      })}
    </styled.g>
  );
};

export const Polygons: React.FC = () => {
  const { state } = usePolygonsContext();
  const polygonIds = useMemo(
    () => Object.keys(state.polygons ?? {}),
    [state.polygons]
  );

  return (
    <>
      {polygonIds.map((polygonKey) => {
        const polygon = state?.polygons?.[polygonKey];

        return (
          polygon && (
            <PolygonComponent
              key={polygonKey}
              polygonKey={polygonKey}
              polygon={polygon}
            />
          )
        );
      })}
      ;
    </>
  );
};
