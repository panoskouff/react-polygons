import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { Padding, Background, Column, Button } from '#/atoms';

export const SideMenu: React.FC = () => {
  const { dispatch, state } = usePolygonsContext();
  return (
    <Background
      bg='#fff'
      css={{
        borderRadius: '10px',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <Padding p='10px'>
        <Column gap='10px'>
          <Button
            text='todo'
            onClick={() => {
              if (state.mode === 'idle') {
                dispatch({ type: 'SET_MODE_ADD' });
              } else {
                dispatch({ type: 'SET_MODE_IDLE' });
              }
            }}
          />

          <Button text='todo' disabled />
        </Column>
      </Padding>
    </Background>
  );
};
