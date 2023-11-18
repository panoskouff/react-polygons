import { styled } from '#/styled-system/jsx';
import type { PandaDivProps } from '#/types';

/* prettier-ignore */
export type ContainerProps = PandaDivProps<
  | 'w'
  | 'minW'
  | 'maxW'
  | 'h'
  | 'minH'
  | 'maxH'
  | 'css'
>;

export const Container: React.FC<ContainerProps> = ({ children, ...rest }) => (
  <styled.div {...rest}>{children}</styled.div>
);
