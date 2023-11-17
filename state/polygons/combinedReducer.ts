import {
  addPointReducer,
  removePolygonReducer,
  setModeIdleReducer,
  editPolygonPointsReducer,
  addVertexToSideReducer,
  removeVertexReducer,
  removeSideReducer,
} from './reducers';
import { State, Action } from '#/types/state/polygons';

export const combinedReducer = (state: State, action: Action): State => {
  console.log('combinedReducer', action.type);
  switch (action.type) {
    case 'SET_MODE_IDLE':
      return setModeIdleReducer(state, action);
    case 'SET_MODE_ADD_POLYGON':
      return { ...state, mode: 'add-polygon' };
    case 'SET_MODE_ADD_VERTEX_TO_SIDE':
      return { ...state, mode: 'add-vertex-to-side' };
    case 'SET_MODE_REMOVE_POLYGON':
      return { ...state, mode: 'remove-polygon' };
    case 'SET_MODE_MOVE_POLYGON':
      return { ...state, mode: 'move-polygon' };
    case 'SET_MODE_REMOVE_VERTEX':
      return { ...state, mode: 'remove-vertex' };
    case 'SET_MODE_REMOVE_SIDE':
      return { ...state, mode: 'remove-side' };
    case 'SET_MODE_MOVE_VERTEX':
      return { ...state, mode: 'move-vertex' };
    case 'ADD_POINT':
      return addPointReducer(state, action);
    case 'EDIT_POLYGON_POINTS':
      return editPolygonPointsReducer(state, action);
    case 'REMOVE_POLYGON':
      return removePolygonReducer(state, action);
    case 'ADD_VERTEX_TO_SIDE':
      return addVertexToSideReducer(state, action);
    case 'REMOVE_VERTEX':
      return removeVertexReducer(state, action);
    case 'REMOVE_SIDE':
      return removeSideReducer(state, action);
    default:
      return state;
  }
};
