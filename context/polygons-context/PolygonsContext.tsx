import { generateKey } from '#/utils';
import React, { useReducer, useContext, createContext } from 'react';
type State = {
  mode: 'idle' | 'add';
  selectedPolygon: string | null;
  polygons: {
    [key: string]: {
      isComplete: boolean;
      points: {
        x: number;
        y: number;
      }[];
    };
  } | null;
};

type Action =
  | { type: 'SET_MODE_IDLE' | 'SET_MODE_ADD' }
  | { type: 'ADD_POINT'; payload: { x: number; y: number } };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODE_IDLE':
      // set selected polygon to null
      return { ...state, selectedPolygon: null, mode: 'idle' };
    case 'SET_MODE_ADD':
      return { ...state, mode: 'add' };
    case 'ADD_POINT':
      if (state.selectedPolygon === null) {
        const newPolygonKey = generateKey('mock-user-id', 'mock-session-id');
        console.log('RETURNING NEW STATE 🔥');
        return {
          ...state,
          selectedPolygon: newPolygonKey,
          polygons: {
            ...state.polygons,
            [newPolygonKey]: {
              isComplete: false,
              points: [action.payload],
            },
          },
        };
      }
      console.log('RETURNING DEFAULT STATE');
      return state;
    default:
      return state;
  }
};
// type Action = { type: 'SET_MODE_IDLE' } | { type: 'SET_MODE_ADD' };

const PolygonsContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: { mode: 'idle', selectedPolygon: null, polygons: null },
  dispatch: () => null, // default function
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
