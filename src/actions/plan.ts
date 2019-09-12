export const UPDATE_WAYPOINT_VALUE = "UPDATE_WAYPOINT_VALUE";
export interface UpdateWaypointValue {
  type: typeof UPDATE_WAYPOINT_VALUE;
  id: string;
  value: string;
}
export const updateWaypointValue = (
  id: string,
  value: string
): UpdateWaypointValue => ({
  type: UPDATE_WAYPOINT_VALUE,
  id,
  value
});

export type PlanAction = UpdateWaypointValue;
