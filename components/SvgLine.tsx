import { styled } from '#/styled-system/jsx';

type Props = {
  pointStart: { x: number; y: number };
  pointEnd: { x: number; y: number };
};

export const SvgLine: React.FC<Props> = ({ pointStart, pointEnd }) => (
  <styled.line
    x1={pointStart.x}
    y1={pointStart.y}
    x2={pointEnd.x}
    y2={pointEnd.y}
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
