import { HTMLStyledProps } from '../styled-system/jsx';

// @todo make a generic PandaComponentProps
export type PandaDivProps<T extends keyof HTMLStyledProps<'div'>> = Merge<
  Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
  Partial<Pick<HTMLStyledProps<'div'>, T>>
>;

export type PandaInputProps<T extends keyof HTMLStyledProps<'input'>> = Merge<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color'>,
  Partial<Pick<HTMLStyledProps<'input'>, T>>
>;
