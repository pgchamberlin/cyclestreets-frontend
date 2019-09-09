import { combineReducers } from 'redux';

import journeyReducer, { JourneyState } from './journeyReducer';

export interface StoreState {
  journey: JourneyState;
}

const rootReducer = combineReducers<StoreState>({
  journey: journeyReducer,
});

export default rootReducer;
