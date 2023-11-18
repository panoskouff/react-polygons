import { Padding, Background, Text, Position } from '#/atoms';
import { styled } from '#/styled-system/jsx';

type Props = {
  name?: string;
  image?: string;
};

const UserImage: React.FC<{ image: string }> = ({ image }) => (
  <styled.img
    src={image}
    width='40px'
    height='40px'
    border='1px solid black'
    borderRadius='50%'
  />
);

export const UserIndicator: React.FC<Props> = ({ name, image }) => {
  if (!name && !image) {
    return null;
  }

  if (name && image) {
    return (
      <Position pos='relative'>
        <Position pos='absolute' top='-4px' left='-2px'>
          <UserImage image={image} />
        </Position>
        <Background
          bg='#fff'
          css={{
            borderRadius: 'md',
            boxShadow: 'variant',
          }}
        >
          <Padding pr='10px' pl='43px'>
            {name && <Text>{name}</Text>}
          </Padding>
        </Background>
      </Position>
    );
  }

  if (name && !image) {
    return (
      <Background
        bg='#fff'
        css={{
          borderRadius: 'md',
          boxShadow: 'variant',
        }}
      >
        <Padding px='10px'>{<Text>{name}</Text>}</Padding>
      </Background>
    );
  }

  if (!name && image) {
    return <UserImage image={image} />;
  }
};
