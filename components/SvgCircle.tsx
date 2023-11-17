import { styled } from '#/styled-system/jsx';

type Props = {
  vertexIndex: number;
  point: { x: number; y: number };
};

export const SvgCircle: React.FC<Props> = ({ vertexIndex, point }) => (
  <styled.circle
    data-vertex-index={vertexIndex}
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
