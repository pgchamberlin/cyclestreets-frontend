import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { StoreState } from "../reducers/rootReducer";
import { Waypoint } from "../model/Waypoint";
import { Option } from "../model/Option";
import {
  updateWaypointInputValue,
  updateWaypointSelection,
  geocode
} from "../actions/plan";
import WaypointInput from "../components/WaypointInput";

const StyledPane = styled.div`
  width: 400px;
  height: 100%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  padding: 10px;
  position: absolute;
`;

interface PaneProps {
  waypoints: Waypoint[];
}

interface PaneDispatchProps {
  updateWaypointInputValue: typeof updateWaypointInputValue;
  updateWaypointSelection: typeof updateWaypointSelection;
  geocode: typeof geocode;
}

const Pane: React.FunctionComponent<PaneProps & PaneDispatchProps> = ({
  waypoints,
  updateWaypointInputValue,
  updateWaypointSelection,
  geocode
}) => {
  const getInputChangeHandler = (id: string) => (value: string) => {
    geocode(value, id);
    updateWaypointInputValue(id, value);
  };

  const getSelectionChangeHandler = (id: string) => (selection: Option) => updateWaypointSelection(id, selection);

  return (
    <StyledPane>
      <div className="content">
        <h1 className="title">Cycle Maps</h1>
      </div>
      <div className="content">
        {waypoints.map(({ id, inputValue, options }, index) => (
          <WaypointInput
            key={id}
            index={index}
            value={inputValue}
            onInputChange={getInputChangeHandler(id)}
            onSelectionChange={getSelectionChangeHandler(id)}
            options={options}
          />
        ))}
      </div>
    </StyledPane>
  );
};

const mapStateToProps = ({ plan: { waypoints } }: StoreState): PaneProps => ({
  waypoints
});

const mapDispatchToProps = (dispatch: Dispatch): PaneDispatchProps =>
  bindActionCreators(
    { updateWaypointInputValue, updateWaypointSelection, geocode },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pane);
