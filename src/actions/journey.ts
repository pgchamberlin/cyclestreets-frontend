import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { StoreState } from "../reducers/rootReducer";

import {
  getNewJourney as getNewJourneyFromApi,
  getExistingJourney as getExistingJourneyFromApi
} from "../api";
import { PlanType, JourneyResponse } from "../model/CycleStreets";

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
  journey: {
    itinerary: string;
    responses: {
      balanced: JourneyResponse;
      fastest: JourneyResponse;
      quietest: JourneyResponse;
    };
  };
}
export const journeySuccess = (
  itinerary: string,
  responses: {
    balanced: JourneyResponse;
    fastest: JourneyResponse;
    quietest: JourneyResponse;
  }
): JourneySuccess => ({
  type: JOURNEY_SUCCESS,
  journey: {
    itinerary,
    responses
  }
});

export const getNewJourney = (
  from: { latitude: number; longitude: number; name: string },
  to: { latitude: number; longitude: number; name: string }
): ThunkAction<void, StoreState, null, Action<string>> => async dispatch => {
  dispatch(journeyRequest());

  const balancedResponse = await getNewJourneyFromApi("balanced", [from, to]);

  const { itinerary } = balancedResponse.marker[0]["@attributes"];

  const [fastestResponse, quietestResponse] = await Promise.all(
    ["fastest", "quietest"].map(plan =>
      getExistingJourneyFromApi(plan as PlanType, itinerary)
    )
  );

  dispatch(
    journeySuccess(itinerary, {
      balanced: balancedResponse,
      fastest: fastestResponse,
      quietest: quietestResponse
    })
  );
};

export type JourneyAction = JourneyRequest | JourneySuccess;
