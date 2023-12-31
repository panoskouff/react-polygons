'use client';
import React, { useReducer, useContext, createContext } from 'react';
import { Action, Polygons, State } from '#/types/state/polygons';
import { combinedReducer } from '#/state/polygons/combinedReducer';

const PolygonsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { mode: 'idle', selectedPolygon: null, polygons: {} },
  dispatch: () => null,
});

const PolygonsContextProvider: React.FC<{
  children: React.ReactNode;
  initialWorkSpace: Polygons | null;
}> = ({ children, initialWorkSpace }) => {
  const [state, dispatch] = useReducer(combinedReducer, {
    mode: 'idle',
    selectedPolygon: null,
    polygons: initialWorkSpace ?? {},
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
