import { JourneyAction } from '../actions/journey';

export interface JourneyState {}

const initialJourneyState: JourneyState = {};

const JourneyReducer = (
  state: JourneyState = initialJourneyState,
  action: JourneyAction
): JourneyState => {
  switch (action) {
    default:
      return state;
  }
};

export default JourneyReducer;
