import React, { useState, useRef, useEffect, useCallback } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactMapGL, { ViewState, MapState } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import baseMapStyle from "../map-style.json";
import { JourneyState } from "../reducers/journeyReducer";
import { StoreState } from "../reducers/rootReducer";
import { ViewportState } from "../reducers/mapReducer";
import { updateViewport } from "../actions/map";

const MapContainer = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const initialViewport: ViewState = {
  latitude: 54.8,
  longitude: -2.5,
  zoom: 5
};

const initialDimensions = {
  width: window.innerWidth,
  height: window.innerHeight
};

export interface MapProps {
  journey: JourneyState;
  viewport: ViewportState;
}

export interface MapDispatchProps {
  updateViewport: typeof updateViewport
}

const Map: React.FunctionComponent<MapProps & MapDispatchProps> = ({ journey, viewport, updateViewport }) => {
  // const [viewport, setViewport] = useState(initialViewport);
  const [dimensions, setDimensions] = useState(initialDimensions);

  const resizeHandler = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  let mapStyle;

  if (journey.currentJourney && journey.journeys[journey.currentJourney]) {
    const balancedResponse = journey.journeys[journey.currentJourney].balanced;

    const balancedGeoJson = {
      type: "LineString",
      coordinates: balancedResponse.marker[0]["@attributes"].coordinates
        .split(" ")
        .map(coordinatesString =>
          coordinatesString
            .split(",")
            .map(coordinateString => parseFloat(coordinateString))
        )
    };

    mapStyle = {
      ...baseMapStyle,
      sources: {
        ...baseMapStyle.sources,
        balancedRoute: {
          type: "geojson",
          data: balancedGeoJson
        }
      },
      layers: [
        ...baseMapStyle.layers,
        {
          id: "balancedRoute",
          source: "balancedRoute",
          type: "line"
        }
      ]
    };
  } else {
    mapStyle = baseMapStyle;
  }

  return (
    <MapContainer>
      <ReactMapGL
        {...viewport}
        {...dimensions}
        mapStyle={mapStyle}
        onViewportChange={updateViewport}
      />
    </MapContainer>
  );
};

const mapStateToProps = ({
  journey,
  map: { viewport }
}: StoreState): MapProps => ({ journey, viewport });

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchProps => bindActionCreators({ updateViewport }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Map);
