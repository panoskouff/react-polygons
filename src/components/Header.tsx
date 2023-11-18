import { Row, Text } from '#/atoms';

export const Header: React.FC = () => {
  return (
    <Row>
      <Text as='h1' textStyle='title' fontSize='32px' fontWeight='bold'>
        Polygons
      </Text>
    </Row>
  );
};
