import {
  addPointReducer,
  removePolygonReducer,
  setModeIdleReducer,
  editPolygonPointsReducer,
} from './reducers';
import { State, Action } from '#/types/state/polygons';

export const combinedReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_MODE_IDLE':
      return setModeIdleReducer(state, action);
    case 'SET_MODE_ADD_POLYGON':
      return { ...state, mode: 'add-polygon' };
    case 'SET_MODE_REMOVE_POLYGON':
      return { ...state, mode: 'remove-polygon' };
    case 'SET_MODE_MOVE_POLYGON':
      return { ...state, mode: 'move-polygon' };
    case 'ADD_POINT':
      return addPointReducer(state, action);
    case 'EDIT_POLYGON_POINTS':
      return editPolygonPointsReducer(state, action);
    case 'REMOVE_POLYGON':
      return removePolygonReducer(state, action);
    default:
      return state;
  }
};
