import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { StoreState } from "../reducers/rootReducer";

import {
  getNewJourney as getNewJourneyFromApi,
  getExistingJourney as getExistingJourneyFromApi
} from "../api";
import { PlanType } from "../model/CycleStreets";
import { Option } from "../model/Option";
import { Journey } from "../model/Journey";
import responsesToJourney from "../helpers/responsesToJourney";

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
  journey: Journey;
}
export const journeySuccess = (journey: Journey): JourneySuccess => ({
  type: JOURNEY_SUCCESS,
  journey
});

export const getNewJourney = (
  from: Option,
  to: Option
): ThunkAction<void, StoreState, null, Action<string>> => async dispatch => {
  dispatch(journeyRequest());

  const balancedResponse = await getNewJourneyFromApi("balanced", [from, to]);

  const { itinerary } = balancedResponse.marker[0]["@attributes"];

  const [fastestResponse, quietestResponse] = await Promise.all(
    ["fastest", "quietest"].map(plan =>
      getExistingJourneyFromApi(plan as PlanType, itinerary)
    )
  );

  const journey = responsesToJourney(
    balancedResponse,
    fastestResponse,
    quietestResponse
  );

  window.history.pushState({}, '', `/${itinerary}`);

  dispatch(journeySuccess(journey));
};

export const getExistingJourney = (
  itinerary: string
): ThunkAction<void, StoreState, null, Action<string>> => async dispatch => {
  dispatch(journeyRequest());

  const [
    balancedResponse,
    fastestResponse,
    quietestResponse
  ] = await Promise.all(
    ["balanced", "fastest", "quietest"].map(plan =>
      getExistingJourneyFromApi(plan as PlanType, itinerary)
    )
  );

  const journey = responsesToJourney(
    balancedResponse,
    fastestResponse,
    quietestResponse
  );

  dispatch(journeySuccess(journey));
};

export type JourneyAction = JourneyRequest | JourneySuccess;
