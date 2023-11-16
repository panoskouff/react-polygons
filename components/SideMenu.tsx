import { usePolygonsContext } from '#/context/polygons-context/PolygonsContext';
import { Padding, Background, Column, Button } from '#/atoms';

export const SideMenu: React.FC = () => {
  const { dispatch, state } = usePolygonsContext();
  return (
    <Background
      bg='#fff'
      css={{
        borderRadius: 'md',
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      }}
    >
      <Padding p='10px'>
        <Column gap='10px'>
          <Button
            text='Add'
            onClick={() => {
              dispatch({ type: 'SET_MODE_ADD' });
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Move'
            onClick={() => {
              dispatch({ type: 'SET_MODE_MOVE' });
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Delete'
            onClick={() => {
              dispatch({ type: 'SET_MODE_DELETE' });
            }}
            disabled={state.mode !== 'idle'}
          />
        </Column>
      </Padding>
    </Background>
  );
};
