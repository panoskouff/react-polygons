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
        <Column gap='10px' css={{ maxW: '100px' }}>
          <Button
            text='Add Polygon'
            onClick={() => {
              dispatch({ type: 'SET_MODE_ADD_POLYGON' });
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Add Vertex'
            onClick={() => {
              dispatch({ type: 'SET_MODE_ADD_VERTEX_TO_SIDE' });
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
            text='Move Vertex'
            onClick={() => {
              dispatch({ type: 'SET_MODE_MOVE_VERTEX' });
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
            text='Remove Side'
            onClick={() => {
              dispatch({ type: 'SET_MODE_REMOVE_SIDE' });
            }}
            disabled={state.mode !== 'idle'}
          />
          <Button
            text='Remove Vertex'
            onClick={() => {
              dispatch({ type: 'SET_MODE_REMOVE_VERTEX' });
            }}
            disabled={state.mode !== 'idle'}
          />
        </Column>
      </Padding>
    </Background>
  );
};
