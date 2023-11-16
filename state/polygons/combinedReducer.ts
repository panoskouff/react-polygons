import {
  addPointReducer,
  deletePolygonReducer,
  setModeIdleReducer,
  editPolygonPointsReducer,
} from './reducers';
import { State, Action } from '#/types/state/polygons';

export const combinedReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODE_IDLE':
      return setModeIdleReducer(state, action);
    case 'SET_MODE_ADD':
      return { ...state, mode: 'add' };
    case 'SET_MODE_DELETE':
      return { ...state, mode: 'delete' };
    case 'SET_MODE_MOVE':
      return { ...state, mode: 'move' };
    case 'ADD_POINT':
      return addPointReducer(state, action);
    case 'EDIT_POLYGON_POINTS':
      return editPolygonPointsReducer(state, action);
    case 'DELETE_POLYGON':
      return deletePolygonReducer(state, action);
    default:
      return state;
  }
};
