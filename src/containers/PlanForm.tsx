import React from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { StoreState } from "../reducers/rootReducer";
import { Waypoint } from "../model/Waypoint";
import { Option } from "../model/Option";
import {
  updateWaypointInputValue,
  updateWaypointSelection,
  geocode
} from "../actions/plan";
import WaypointInput from "../components/WaypointInput";
import { getNewJourney } from "../actions/journey";

interface PaneProps {
  waypoints: Waypoint[];
}

interface PaneDispatchProps {
  updateWaypointInputValue: typeof updateWaypointInputValue;
  updateWaypointSelection: typeof updateWaypointSelection;
  geocode: typeof geocode;
  getNewJourney: typeof getNewJourney;
}

const Pane: React.FunctionComponent<PaneProps & PaneDispatchProps> = ({
  waypoints,
  updateWaypointInputValue,
  updateWaypointSelection,
  geocode,
  getNewJourney
}) => {
  const getInputChangeHandler = (id: string) => (value: string) => {
    geocode(value, id);
    updateWaypointInputValue(id, value);
  };

  const getSelectionChangeHandler = (id: string) => (selection: Option) =>
    updateWaypointSelection(id, selection);

  const isMissingSelections = waypoints.some(({ selection }) => !selection);

  return (
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
        <div className="field is-grouped is-grouped-right">
          <button
            className="button is-link"
            disabled={isMissingSelections}
            onClick={() => {
              if (waypoints[0].selection && waypoints[1].selection)
                getNewJourney(waypoints[0].selection, waypoints[1].selection);
            }}
          >
            Plan
          </button>
        </div>
      </div>
  );
};

const mapStateToProps = ({ plan: { waypoints } }: StoreState): PaneProps => ({
  waypoints
});

const mapDispatchToProps = (dispatch: Dispatch): PaneDispatchProps =>
  bindActionCreators(
    {
      updateWaypointInputValue,
      updateWaypointSelection,
      geocode,
      getNewJourney
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pane);
