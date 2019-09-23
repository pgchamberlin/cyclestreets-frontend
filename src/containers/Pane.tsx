import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState } from "../reducers/rootReducer";
import { SearchState } from "../reducers/searchReducer";

import { updateWaypointValue } from "../actions/plan";
import { geocode } from "../actions/search";
import WaypointInput from "../components/WaypointInput";

interface PaneProps {
  waypoints: {
    id: string;
    value: string;
  }[];
  search: SearchState;
}

interface PaneDispatchProps {
  updateWaypointValue: typeof updateWaypointValue;
  geocode: typeof geocode;
}

const Pane: React.FunctionComponent<PaneProps & PaneDispatchProps> = ({
  waypoints,
  updateWaypointValue,
  geocode,
  search
}) => {
  const getInputChangeHandler = (id: string) => (value: string) => {
    geocode(value, id);
    updateWaypointValue(id, value);
  };

  return (
    <div>
      {waypoints.map(({ id, value }) => (
        <WaypointInput
          key={id}
          value={value}
          onChange={getInputChangeHandler(id)}
          results={search.result}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({
  plan: { waypoints },
  search
}: StoreState): PaneProps => ({
  waypoints,
  search
});

const mapDispatchToProps = (dispatch: Dispatch): PaneDispatchProps =>
  bindActionCreators({ updateWaypointValue, geocode }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pane);
