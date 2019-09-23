import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import { StoreState } from "../reducers/rootReducer";
import { SearchState } from "../reducers/searchReducer";

import { updateWaypointValue } from "../actions/plan";
import { geocode } from "../actions/search";
import WaypointInput from "../components/WaypointInput";

const StyledPane = styled.div`
  width: 400px;
  height: 100%;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
  padding: 10px;
  position: absolute;
`;

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
    <StyledPane>
      <div className="content">
        <h1 className="title">
          Cycle Maps
        </h1>
      </div>
      <div className="content">
        {waypoints.map(({ id, value }, index) => (
          <WaypointInput
            key={id}
            index={index}
            value={value}
            onChange={getInputChangeHandler(id)}
            results={search.result}
          />
        ))}
      </div>
    </StyledPane>
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
