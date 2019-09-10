import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { StoreState } from "../reducers/rootReducer";

import { getNewJourney as getNewJourneyFromApi } from "../api";

export const JOURNEY_REQUEST = "JOURNEY_REQUEST";
export interface JourneyRequest {
  type: typeof JOURNEY_REQUEST;
}
export const journeyRequest = (): JourneyRequest => ({
  type: JOURNEY_REQUEST
});

export const JOURNEY_SUCCESS = "JOURNEY_SUCCESS";
export interface JourneySuccess {
  type: typeof JOURNEY_SUCCESS;
  journey: any;
}
export const journeySuccess = (journey: any): JourneySuccess => ({
  type: JOURNEY_SUCCESS,
  journey
});

export const getNewJourney = (
  from: { latitude: number; longitude: number; name: string },
  to: { latitude: number; longitude: number; name: string }
): ThunkAction<void, StoreState, null, Action<string>> => async dispatch => {
  dispatch(journeyRequest());

  const journey = await getNewJourneyFromApi("balanced", [from, to]);

  dispatch(journeySuccess(journey));
};

export type JourneyAction = JourneyRequest | JourneySuccess;
