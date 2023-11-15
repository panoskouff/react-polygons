import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { Padding, Background, Row, Button } from '#/atoms';

export const TopMenu: React.FC = () => {
  const { dispatch, state } = usePolygonsContext();

  if (state.mode === 'idle') {
    return null;
  }

  return (
    <Background
      bg='#fff'
      css={{
        borderRadius: 'md',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <Padding p='10px'>
        <Row gap='10px'>
          <Button
            text='Cancel'
            onClick={() => {
              dispatch({ type: 'SET_MODE_IDLE' });
            }}
          />
        </Row>
      </Padding>
    </Background>
  );
};
