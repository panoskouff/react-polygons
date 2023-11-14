import { PandaDivProps } from '#/types';
import { Position, PositionPandaProperties } from './Position';

export type TransformPandaProperties =
  | PositionPandaProperties
  | 'transform'
  | 'transformOrigin'
  | 'transformStyle'
  | 'backfaceVisibility'
  | 'perspective'
  | 'perspectiveOrigin'
  | 'visibility';

type TransformProps = PandaDivProps<TransformPandaProperties | 'css'>;

export const Transform: React.FC<TransformProps> = ({ children, ...rest }) => (
  <Position pos='absolute' {...rest}>
    {children}
  </Position>
);
