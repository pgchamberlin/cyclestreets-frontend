import React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import styled from "styled-components";
import { StoreState } from "../reducers/rootReducer";
import { JourneyState } from "../reducers/journeyReducer";
import { RouteType } from "../model/Journey";
import { updateSelectedRoute } from "../actions/map";

interface RouteListItemProps {
  selected: boolean
}

const RouteListItem = styled.div<RouteListItemProps>`
  border-left: ${({selected}) => selected ? '5px solid hsl(141, 71%, 48%)' : 'none'};
  padding-left:  ${({selected}) => selected ? '5px' : '10px'};
  font-weight: ${({selected}) => selected ? 'bold' : 'normal'};
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

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
      {Object.keys(journey.routes).map(routeType => {
        const route = journey.routes[routeType as RouteType];

        return (
        <RouteListItem
          key={routeType}
          onClick={() => updateSelectedRoute(routeType as RouteType)}
          selected={routeType === selectedRoute}
        >
          {`${routeType.charAt(0).toUpperCase()}${routeType.substring(1)}`}
          <small>{(route.length / 1000).toFixed(1)} km ∙ {Math.round(route.time / 60)} min</small>
        </RouteListItem>
      )})}
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
