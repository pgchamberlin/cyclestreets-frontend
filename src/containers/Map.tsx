import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import ReactMapGL, { ViewState } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

import baseMapStyle from "../map-style.json";
import { JourneyState } from "../reducers/journeyReducer.js";
import { StoreState } from "../reducers/rootReducer.js";

const MapContainer = styled.div`
  position: absolute;
  left: 400px;
`;

const initialViewport: ViewState = {
  latitude: 54.8,
  longitude: -2.5,
  zoom: 5
};

export interface MapProps {
  journey: JourneyState;
}

const Map: React.FunctionComponent<MapProps> = ({ journey }) => {
  const [viewport, setViewport] = useState(initialViewport);

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
        width={1000}
        height={800}
        mapStyle={mapStyle}
        onViewportChange={viewport => setViewport(viewport)}
      />
    </MapContainer>
  );
};

const mapStateToProps = ({ journey }: StoreState): MapProps => ({ journey });

export default connect(mapStateToProps)(Map);
