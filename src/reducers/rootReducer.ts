import { combineReducers } from "redux";

import journeyReducer, { JourneyState } from "./journeyReducer";
import planReducer, { PlanState } from "./planReducer";

export interface StoreState {
  journey: JourneyState;
  plan: PlanState;
}

const rootReducer = combineReducers<StoreState>({
  journey: journeyReducer,
  plan: planReducer
});

export default rootReducer;
