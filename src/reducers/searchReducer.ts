import {
  SearchAction,
  GEOCODE_REQUEST,
  GEOCODE_SUCCESS
} from "../actions/search";

import uuid from "uuid/v4";

export interface SearchState {
  waypointId: string | null;
  query: string;
  result?: {
    name: string;
    near: string;
    latitude: number;
    longitude: number;
    id: string;
  }[];
}

const initialSearchState: SearchState = {
  waypointId: null,
  query: ""
};

const searchReducer = (
  state: SearchState = initialSearchState,
  action: SearchAction
): SearchState => {
  switch (action.type) {
    case GEOCODE_REQUEST:
      return {
        ...state,
        waypointId: action.waypointId,
        query: action.query,
        result:
          action.waypointId === state.waypointId ? state.result : undefined
      };
    case GEOCODE_SUCCESS:
      return action.query === state.query
        ? {
            waypointId: action.waypointId,
            result: action.result.features.map(
              ({
                properties: { name, near },
                geometry: {
                  coordinates: [latitude, longitude]
                }
              }) => ({
                name,
                near,
                latitude,
                longitude,
                id: uuid()
              })
            ),
            query: action.query
          }
        : state;
    default:
      return state;
  }
};

export default searchReducer;
