import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { getNewJourney } from "./actions/journey";

interface AppDispatchProps {
  getNewJourney: typeof getNewJourney;
}

const App: React.FunctionComponent<AppDispatchProps> = ({ getNewJourney }) => {
  return (
    <div className="App">
      <p>Hi</p>
      <p>
        <button
          onClick={() =>
            getNewJourney(
              { longitude: -0.1686023, latitude: 51.4710974, name: "Home" },
              { longitude: -0.1238763, latitude: 51.5306198, name: "Work" }
            )
          }
        >
          Get journey
        </button>
      </p>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getNewJourney }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(App);
