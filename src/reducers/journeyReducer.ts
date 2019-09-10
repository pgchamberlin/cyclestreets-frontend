import { JourneyAction, JOURNEY_SUCCESS } from "../actions/journey";
import { JourneyResponse } from "../model/CycleStreets";

export interface JourneyState {
  journeys: {
    [itinerary: string]: {
      balanced: JourneyResponse;
      fastest: JourneyResponse;
      quietest: JourneyResponse;
    };
  };
  currentJourney: string | null;
}

const initialJourneyState: JourneyState = {
  journeys: {},
  currentJourney: null
};

const JourneyReducer = (
  state: JourneyState = initialJourneyState,
  action: JourneyAction
): JourneyState => {
  switch (action.type) {
    case JOURNEY_SUCCESS:
      return {
        journeys: {
          ...state.journeys,
          [action.journey.itinerary]: action.journey.responses
        },
        currentJourney: action.journey.itinerary
      }
    default:
      return state;
  }
};

export default JourneyReducer;
