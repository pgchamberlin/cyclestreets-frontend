import { JourneyAction, JOURNEY_SUCCESS } from "../actions/journey";
import { Journey } from "../model/Journey";

export type JourneyState = Journey | null

const initialJourneyState: JourneyState = null;

const JourneyReducer = (
  state: JourneyState = initialJourneyState,
  action: JourneyAction
): JourneyState => {
  switch (action.type) {
    case JOURNEY_SUCCESS:
      return action.journey
    default:
      return state;
  }
};

export default JourneyReducer;
