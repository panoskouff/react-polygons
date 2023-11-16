import { setModeIdleAction, State } from '#/types/state/polygons';

export const setModeIdleReducer = (
  state: State,
  action: setModeIdleAction
): State => {
  const selectedPolygon = state.selectedPolygon;

  if (
    selectedPolygon !== null &&
    !state.polygons?.[selectedPolygon]?.isComplete
  ) {
    if (!state.polygons) {
      // here to satisfy typescript - this should never happen
      console.error('setModeIdleReducer: state.polygons is undefined');
      return state;
    }

    const { [selectedPolygon]: _, ...remainingPolygons } = state.polygons;
    return {
      ...state,
      mode: 'idle',
      selectedPolygon: null,
      polygons: remainingPolygons,
    };
  }

  return {
    ...state,
    mode: 'idle',
  };
};
