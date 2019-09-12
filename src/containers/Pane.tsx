import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState } from "../reducers/rootReducer";

import { updateWaypointValue } from "../actions/plan";

interface PaneProps {
  waypoints: {
    id: string;
    value: string;
  }[];
}

interface PaneDispatchProps {
  updateWaypointValue: typeof updateWaypointValue;
}

const Pane: React.FunctionComponent<PaneProps & PaneDispatchProps> = ({
  waypoints,
  updateWaypointValue
}) => {
  return (
    <div>
      {waypoints.map(({ id, value }) => (
        <div key={id}>
          <input
            value={value}
            onChange={({ target: { value } }) => updateWaypointValue(id, value)}
          />
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({ plan: { waypoints } }: StoreState): PaneProps => ({
  waypoints
});

const mapDispatchToProps = (dispatch: Dispatch): PaneDispatchProps =>
  bindActionCreators({ updateWaypointValue }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pane);
