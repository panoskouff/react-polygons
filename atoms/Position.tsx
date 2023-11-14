import { PandaDivProps } from '#/types';
import { styled } from '../styled-system/jsx';

export type PositionPandaProperties =
  | 'pos'
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'insetStart'
  | 'insetEnd';

type PositionProps = PandaDivProps<PositionPandaProperties | 'css'>;

export const Position: React.FC<PositionProps> = ({ children, ...rest }) => (
  <styled.div pos='absolute' top={0} right={0} bottom={0} left={0} {...rest}>
    {children}
  </styled.div>
);
