import {
  JourneyAction,
  JOURNEY_SUCCESS,
  JOURNEY_REQUEST,
} from '../actions/journey';
import { Journey } from '../model/Journey';

export type JourneyState = {
  isLoading: boolean;
  journey: Journey | null;
};

const initialJourneyState: JourneyState = {
  isLoading: false,
  journey: null,
};

const JourneyReducer = (
  state: JourneyState = initialJourneyState,
  action: JourneyAction
): JourneyState => {
  switch (action.type) {
    case JOURNEY_REQUEST:
      return {
        isLoading: true,
        journey: null,
      };
    case JOURNEY_SUCCESS:
      return {
        isLoading: false,
        journey: action.journey,
      };
    default:
      return state;
  }
};

export default JourneyReducer;
