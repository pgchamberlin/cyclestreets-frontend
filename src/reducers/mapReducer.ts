import { MapAction, UPDATE_VIEWPORT } from "../actions/map";
import { JourneyAction, JOURNEY_SUCCESS } from "../actions/journey";
import WebMercatorViewport from "viewport-mercator-project";
import {
  TransitionInterpolator,
  TRANSITION_EVENTS,
  EasingFunction
} from "react-map-gl";
import { RouteType } from "../model/Journey";

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
  selectedRoute: RouteType;
}

const initialMapSate: MapState = {
  viewport: {
    latitude: 54.8,
    longitude: -2.5,
    zoom: 5
  },
  selectedRoute: "balanced"
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
          [action.journey.bbox[0], action.journey.bbox[1]],
          [action.journey.bbox[2], action.journey.bbox[3]]
        ],
        {
          padding: 20,
          offset: [400, 0]
        }
      );
      return {
        ...state,
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
