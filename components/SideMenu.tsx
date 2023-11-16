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
            text='Add Polygon'
            onClick={() => {
              dispatch({ type: 'SET_MODE_ADD_POLYGON' });
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Move Polygon'
            onClick={() => {
              dispatch({ type: 'SET_MODE_MOVE_POLYGON' });
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Remove Polygon'
            onClick={() => {
              dispatch({ type: 'SET_MODE_REMOVE_POLYGON' });
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Add Vertex - @TODO'
            onClick={() => {
              alert('todo');
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Move Vertex - @TODO'
            onClick={() => {
              alert('todo');
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Remove Vertex - @TODO'
            onClick={() => {
              alert('todo');
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Remove Side - @TODO'
            onClick={() => {
              alert('todo');
            }}
            disabled={state.mode !== 'idle'}
          />
        </Column>
      </Padding>
    </Background>
  );
};
