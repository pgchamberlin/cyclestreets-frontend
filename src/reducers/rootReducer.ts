import { combineReducers } from "redux";

import journeyReducer, { JourneyState } from "./journeyReducer";
import planReducer, { PlanState } from "./planReducer";
import mapReducer, { MapState } from "./mapReducer";

export interface StoreState {
  journey: JourneyState;
  plan: PlanState;
  map: MapState;
}

const rootReducer = combineReducers<StoreState>({
  journey: journeyReducer,
  plan: planReducer,
  map: mapReducer
});

export default rootReducer;
