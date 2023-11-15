import { styled } from '#/styled-system/jsx';
import type { PandaButtonProps } from '#/types';
import { Text, Padding } from '#/atoms';

export type ButtonProps = PandaButtonProps<'display' | 'p' | 'css'> & {
  text?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  text,
  p = '0 10px',
  ...rest
}) => (
  <styled.button
    bg='#fff'
    cursor='pointer'
    display='inline-block'
    border='1px solid #ccc'
    borderRadius='sm'
    boxShadow='rgba(0, 0, 0, 0.16) 0px 1px 4px'
    _hover={{ bg: '#eee' }}
    _disabled={{
      bg: '#ccc',
      opacity: 0.5,
      cursor: 'auto',
      _hover: { bg: '#ccc' },
    }}
    {...rest}
  >
    {text && (
      <Padding p={p}>
        <Text>{text}</Text>
      </Padding>
    )}
    {children}
  </styled.button>
);
