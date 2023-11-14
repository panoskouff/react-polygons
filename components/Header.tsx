import { Row, Text } from '#/atoms';

export const Header: React.FC = () => {
  return (
    <Row>
      <Text as='h1' textStyle='title'>
        Polygons
      </Text>
    </Row>
  );
};
