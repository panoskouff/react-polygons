import React, { useReducer, useContext, createContext } from 'react';
type State = {
  mode: 'idle' | 'add';
};

type Action = { type: 'SET_MODE_IDLE' } | { type: 'SET_MODE_ADD' };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODE_IDLE':
      return { mode: 'idle' };
    case 'SET_MODE_ADD':
      return { mode: 'add' };
    default:
      return state;
  }
};

const PolygonsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { mode: 'idle' },
  dispatch: () => null, // default function
});

const PolygonsContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, { mode: 'idle' });

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
