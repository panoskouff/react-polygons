import { styled } from '#/styled-system/jsx';

type Props = {
  points: string;
};

export const SvgPolygon: React.FC<Props> = ({ points }) => (
  <styled.polygon
    points={points}
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
);
