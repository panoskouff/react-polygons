import React, { useReducer, useContext, createContext } from 'react';
import { Action, State } from './types';
import {
  addPointReducer,
  deletePolygonReducer,
  setModeIdleReducer,
} from './reducers';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODE_IDLE':
      return setModeIdleReducer(state, action);
    case 'SET_MODE_ADD':
      return { ...state, mode: 'add' };
    case 'SET_MODE_DELETE':
      return { ...state, mode: 'delete' };
    case 'ADD_POINT':
      return addPointReducer(state, action);
    case 'DELETE_POLYGON':
      return deletePolygonReducer(state, action);
    default:
      return state;
  }
};

const PolygonsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { mode: 'idle', selectedPolygon: null, polygons: null },
  dispatch: () => null,
});

const PolygonsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // @todo get initial state from provider or user storage
  const [state, dispatch] = useReducer(reducer, {
    mode: 'idle',
    selectedPolygon: null,
    polygons: null,
  });

  return (
    <PolygonsContext.Provider value={{ state, dispatch }}>
      {children}
    </PolygonsContext.Provider>
  );
};

const usePolygonsContext = () => {
  const context = useContext(PolygonsContext);
  if (context === undefined) {
    throw new Error(
      'usePolygonsContext must be used within a PolygonsContextProvider'
    );
  }
  return context;
};

export { PolygonsContextProvider, usePolygonsContext };
