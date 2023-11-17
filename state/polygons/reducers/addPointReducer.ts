import { arePointsNearby } from '#/utils';
import { AddPointAction, State } from '#/types/state/polygons';

export const addPointReducer = (
  state: State,
  action: AddPointAction
): State => {
  if (state.selectedPolygon === null) {
    const newPolygonKey = Date.now().toString();

    return {
      ...state,
      selectedPolygon: newPolygonKey,
      polygons: {
        ...state.polygons,
        [newPolygonKey]: {
          isComplete: false,
          points: [action.payload.point],
        },
      },
    };
  } else {
    const currentAmountOfPoints =
      state.polygons?.[state.selectedPolygon]?.points?.length;
    const startingPoint = state.polygons?.[state.selectedPolygon]?.points?.[0];

    if (!currentAmountOfPoints || !startingPoint) {
      // here to satisfy typescript - this should never happen
      console.error(
        'AddPointReducer: currentAmountOfPoints or startingPoint is undefined'
      );
      return state;
    }

    const possibleToCompletePolygon = currentAmountOfPoints >= 2;

    const newPoint = action.payload.point;
    let pointToBeAdded = newPoint;
    let polygonToBeCompleted = false;

    if (
      possibleToCompletePolygon &&
      arePointsNearby(newPoint, startingPoint, 15)
    ) {
      pointToBeAdded = startingPoint;
      polygonToBeCompleted = true;
    }

    return {
      ...state,
      selectedPolygon: polygonToBeCompleted ? null : state.selectedPolygon,
      polygons: {
        ...state.polygons,
        [state.selectedPolygon]: {
          ...state.polygons?.[state.selectedPolygon],
          isComplete: polygonToBeCompleted,
          points: [
            ...(state.polygons?.[state.selectedPolygon]?.points ?? []),
            pointToBeAdded,
          ],
        },
      },
    };
  }
};
