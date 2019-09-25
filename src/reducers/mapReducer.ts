import { MapAction, UPDATE_VIEWPORT } from "../actions/map";
import { JourneyAction, JOURNEY_SUCCESS } from "../actions/journey";
import WebMercatorViewport from "viewport-mercator-project";
import {
  TransitionInterpolator,
  TRANSITION_EVENTS,
  EasingFunction
} from "react-map-gl";

export interface ViewportState {
  latitude: number;
  longitude: number;
  zoom: number;
  transitionDuration?: number;
  transitionInterpolator?: TransitionInterpolator;
  transitionInterruption?: TRANSITION_EVENTS;
  transitionEasing?: EasingFunction;
}

export interface MapState {
  viewport: ViewportState;
}

const initialMapSate: MapState = {
  viewport: {
    latitude: 54.8,
    longitude: -2.5,
    zoom: 5
  }
};

const mapReducer = (
  state: MapState = initialMapSate,
  action: MapAction | JourneyAction
): MapState => {
  switch (action.type) {
    case UPDATE_VIEWPORT:
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...action.viewport
        }
      };
    case JOURNEY_SUCCESS:
      const { longitude, latitude, zoom } = new WebMercatorViewport(
        state.viewport
      ).fitBounds(
        [
          [
            parseFloat(
              action.journey.responses.balanced.marker[0]["@attributes"].west
            ),
            parseFloat(
              action.journey.responses.balanced.marker[0]["@attributes"].north
            )
          ],
          [
            parseFloat(
              action.journey.responses.balanced.marker[0]["@attributes"].east
            ),
            parseFloat(
              action.journey.responses.balanced.marker[0]["@attributes"].south
            )
          ]
        ],
        {
          padding: 20,
          offset: [400, 0]
        }
      );
      return {
        viewport: {
          ...state.viewport,
          longitude,
          latitude,
          zoom
        }
      };
    default:
      return state;
  }
};

export default mapReducer;
