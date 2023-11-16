import { DeletePolygonAction, State } from '#/types/state/polygons';

export const removePolygonReducer = (
  state: State,
  action: DeletePolygonAction
): State => {
  if (!state.polygons) {
    // here to satisfy typescript - should never happen
    console.error('removePolygonReducer: No polygons in state');
    return state;
  }

  const { [action.payload.polygonId]: _, ...restPolygons } = state.polygons;

  return {
    ...state,
    polygons: restPolygons,
  };
};
