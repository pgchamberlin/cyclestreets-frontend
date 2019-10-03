import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { StoreState } from "../reducers/rootReducer";
import { geocode as geocodeFromApi } from "../api";
import { GeocodeResponse } from "../model/CycleStreets";
import { Option } from "../model/Option";

export const UPDATE_WAYPOINT_INPUT_VALUE = "UPDATE_WAYPOINT_INPUT_VALUE";
export interface UpdateWaypointInputValue {
  type: typeof UPDATE_WAYPOINT_INPUT_VALUE;
  waypointId: string;
  value: string;
}
export const updateWaypointInputValue = (
  waypointId: string,
  value: string
): UpdateWaypointInputValue => ({
  type: UPDATE_WAYPOINT_INPUT_VALUE,
  waypointId,
  value
});

export const GEOCODE_REQUEST = "GEOCODE_REQUEST";
interface GeocodeRequest {
  type: typeof GEOCODE_REQUEST;
  query: string;
  waypointId: string;
}
export const geocodeRequest = (
  query: string,
  waypointId: string
): GeocodeRequest => ({
  type: GEOCODE_REQUEST,
  query,
  waypointId
});

export const GEOCODE_SUCCESS = "GEOCODE_SUCCESS";
interface GeocodeSuccess {
  type: typeof GEOCODE_SUCCESS;
  query: string;
  waypointId: string;
  result: GeocodeResponse;
}
export const geocodeSuccess = (
  query: string,
  waypointId: string,
  result: GeocodeResponse
): GeocodeSuccess => ({
  type: GEOCODE_SUCCESS,
  query,
  waypointId,
  result
});

export const geocode = (
  query: string,
  waypointId: string
): ThunkAction<void, StoreState, null, Action<string>> => async dispatch => {
  dispatch(geocodeRequest(query, waypointId));

  if (query.length <= 1) return;

  const geocodeResponse = await geocodeFromApi(query);

  if (geocodeResponse) {
    dispatch(geocodeSuccess(query, waypointId, geocodeResponse));
  }
};

export const UPDATE_WAYPOINT_SELECTION = "UPDATE_WAYPOINT_SELECTION";
export interface UpdateWaypointSelection {
  type: typeof UPDATE_WAYPOINT_SELECTION;
  waypointId: string;
  selection: Option;
}
export const updateWaypointSelection = (
  waypointId: string,
  selection: Option
): UpdateWaypointSelection => ({
  type: UPDATE_WAYPOINT_SELECTION,
  waypointId,
  selection
});

export type PlanAction =
  | UpdateWaypointInputValue
  | GeocodeRequest
  | GeocodeSuccess
  | UpdateWaypointSelection;
