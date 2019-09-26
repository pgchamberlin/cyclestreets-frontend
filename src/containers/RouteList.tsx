import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { StoreState } from "../reducers/rootReducer";
import { JourneyState } from "../reducers/journeyReducer";
import { RouteType } from "../model/Journey";
import { updateSelectedRoute } from "../actions/map";

interface RouteListProps {
  journey: JourneyState;
  selectedRoute: RouteType;
}

interface RouteListDispatchProps {
  updateSelectedRoute: typeof updateSelectedRoute;
}

const RouteList: React.FunctionComponent<
  RouteListProps & RouteListDispatchProps
> = ({ journey, selectedRoute, updateSelectedRoute }) => {
  if (!journey) {
    return null;
  }

  return (
    <div>
      {Object.keys(journey.routes).map(routeType => (
        <div
          key={routeType}
          onClick={() => updateSelectedRoute(routeType as RouteType)}
        >
          {routeType}
          {routeType === selectedRoute && " ✓"}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = ({
  journey,
  map: { selectedRoute }
}: StoreState): RouteListProps => ({
  journey,
  selectedRoute
});

const mapDispatchToProps = (dispatch: Dispatch): RouteListDispatchProps =>
  bindActionCreators(
    {
      updateSelectedRoute
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RouteList);
