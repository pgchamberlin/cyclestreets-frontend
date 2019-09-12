import { PlanAction, UPDATE_WAYPOINT_VALUE } from "../actions/plan";
import uuid from "uuid/v4";

interface Waypoint {
  id: string;
  value: string;
  selection: {
    latitude: number;
    longitude: number;
    name: string;
    near: string;
  } | null;
}

export interface PlanState {
  waypoints: Waypoint[];
}

const getWaypoint = () => ({
  id: uuid(),
  value: "",
  selection: null
});

const initialSearchState: PlanState = {
  waypoints: Array.from({ length: 2 }).map(getWaypoint)
};

const planReducer = (
  state: PlanState = initialSearchState,
  action: PlanAction
): PlanState => {
  switch (action.type) {
    case UPDATE_WAYPOINT_VALUE:
      const waypointIndex = state.waypoints.findIndex(
        ({ id }) => id === action.id
      );
      return {
        ...state,
        waypoints: [
          ...state.waypoints.slice(0, waypointIndex),
          {
            ...state.waypoints[waypointIndex],
            value: action.value
          },
          ...state.waypoints.slice(waypointIndex + 1)
        ]
      };
    default:
      return state;
  }
};

export default planReducer;
