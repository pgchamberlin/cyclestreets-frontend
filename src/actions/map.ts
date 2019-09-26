import { ViewState } from "react-map-gl";
import { RouteType } from "../model/Journey";

export const UPDATE_VIEWPORT = "UPDATE_VIEWPORT";
interface UpdateViewport {
  type: typeof UPDATE_VIEWPORT;
  viewport: ViewState;
}
export const updateViewport = (viewport: ViewState): UpdateViewport => ({
  type: UPDATE_VIEWPORT,
  viewport
});

export const UPDATE_SELECTED_ROUTE = "UPDATE_SELECTED_ROUTE";
interface UpdateSelectedRoute {
  type: typeof UPDATE_SELECTED_ROUTE;
  selectedRoute: RouteType;
}
export const updateSelectedRoute = (
  selectedRoute: RouteType
): UpdateSelectedRoute => ({
  type: UPDATE_SELECTED_ROUTE,
  selectedRoute
});

export type MapAction = UpdateViewport | UpdateSelectedRoute;
