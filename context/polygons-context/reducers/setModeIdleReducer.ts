import { setModeIdleAction, State } from '../types';

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
      // this should never happen
      throw new Error('setModeIdleReducer: state.polygons is undefined');
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
