import {
  PlanAction,
  UPDATE_WAYPOINT_INPUT_VALUE,
  GEOCODE_REQUEST,
  GEOCODE_SUCCESS,
} from '../actions/plan';
import uuid from 'uuid/v4';

interface Option {
  latitude: number;
  longitude: number;
  name: string;
  near: string;
  id: string;
}

interface Waypoint {
  id: string;
  inputValue: string;
  selection: Option | null;
  optionsQuery: string | null;
  options: Option[];
}

export interface PlanState {
  waypoints: Waypoint[];
}

const getWaypoint = (): Waypoint => ({
  id: uuid(),
  inputValue: '',
  selection: null,
  optionsQuery: null,
  options: [],
});

const initialSearchState: PlanState = {
  waypoints: Array.from({ length: 2 }).map(getWaypoint),
};

const getWaypointIndex = (state: PlanState, id: string) =>
  state.waypoints.findIndex(({ id: stateId }) => stateId === id);

const planReducer = (
  state: PlanState = initialSearchState,
  action: PlanAction
): PlanState => {
  const waypointIndex = getWaypointIndex(state, action.waypointId);

  switch (action.type) {
    case UPDATE_WAYPOINT_INPUT_VALUE:
      return {
        ...state,
        waypoints: [
          ...state.waypoints.slice(0, waypointIndex),
          {
            ...state.waypoints[waypointIndex],
            inputValue: action.value,
          },
          ...state.waypoints.slice(waypointIndex + 1),
        ],
      };
    case GEOCODE_REQUEST:
      return {
        ...state,
        waypoints: [
          ...state.waypoints.slice(0, waypointIndex),
          {
            ...state.waypoints[waypointIndex],
            optionsQuery: action.query,
          },
          ...state.waypoints.slice(waypointIndex + 1),
        ],
      };
    case GEOCODE_SUCCESS:
      return {
        ...state,
        waypoints: [
          ...state.waypoints.slice(0, waypointIndex),
          {
            ...state.waypoints[waypointIndex],
            options:
              action.query === state.waypoints[waypointIndex].optionsQuery
                ? action.result.features.map(
                    ({
                      properties: { name, near },
                      geometry: {
                        coordinates: [latitude, longitude],
                      },
                    }) => ({
                      name,
                      near,
                      latitude,
                      longitude,
                      id: uuid(),
                    })
                  )
                : state.waypoints[waypointIndex].options,
          },
          ...state.waypoints.slice(waypointIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export default planReducer;
