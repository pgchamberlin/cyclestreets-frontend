import { combineReducers } from "redux";

import journeyReducer, { JourneyState } from "./journeyReducer";
import planReducer, { PlanState } from "./planReducer";
import searchReducer, { SearchState } from "./searchReducer";

export interface StoreState {
  journey: JourneyState;
  plan: PlanState;
  search: SearchState;
}

const rootReducer = combineReducers<StoreState>({
  journey: journeyReducer,
  plan: planReducer,
  search: searchReducer,
});

export default rootReducer;
