import { generateKey, arePointsNearby } from '#/utils';
import { AddPointAction, State } from '../types';

export const addPointReducer = (
  state: State,
  action: AddPointAction
): State => {
  if (state.selectedPolygon === null) {
    const newPolygonKey = generateKey('mock-user-id', 'mock-session-id');

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
      // this should never happen
      throw new Error(
        'AddPointReducer: currentAmountOfPoints or startingPoint is undefined'
      );
    }

    const possibleToCompletePolygon = currentAmountOfPoints >= 2;

    const newPoint = action.payload.point;
    let pointToBeAdded = newPoint;
    let polygonToBeCompleted = false;

    if (
      possibleToCompletePolygon &&
      arePointsNearby(newPoint, startingPoint, 15)
    ) {
      console.log('hit');
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
