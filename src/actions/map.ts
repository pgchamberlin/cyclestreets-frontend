import { ViewState } from "react-map-gl";

export const UPDATE_VIEWPORT = "UPDATE_VIEWPORT";
interface UpdateViewport {
  type: typeof UPDATE_VIEWPORT;
  viewport: ViewState;
}
export const updateViewport = (viewport: ViewState): UpdateViewport => ({
  type: UPDATE_VIEWPORT,
  viewport
});

export type MapAction = UpdateViewport;
