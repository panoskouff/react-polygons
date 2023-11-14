import { PandaDivProps } from '#/types';
import { styled } from '../styled-system/jsx';

type MaskProps = PandaDivProps<'pos' | 'w' | 'h' | 'css'>;

export const Mask: React.FC<MaskProps> = ({ children, ...rest }) => (
  // @todo should I inherit from Position here and have absolute with 0s as a default?
  <styled.div pos='relative' overflow='hidden' {...rest}>
    {children}
  </styled.div>
);
