import uuid from "uuid/v4";
import { BBox } from "geojson";
import { JourneyResponse } from "../model/CycleStreets";
import { Journey, Route } from "../model/Journey";

const transformResponse = (response: JourneyResponse): Route => {
  const routeMarker = response.marker[0]["@attributes"];

  return {
    geoJson: {
      type: "LineString",
      coordinates: routeMarker.coordinates
        .split(" ")
        .map(coordinatesString =>
          coordinatesString
            .split(",")
            .map(coordinateString => parseFloat(coordinateString))
        )
    },
    bbox: [
      parseFloat(routeMarker.west),
      parseFloat(routeMarker.south),
      parseFloat(routeMarker.east),
      parseFloat(routeMarker.north)
    ],
    length: parseInt(routeMarker.length, 10),
    time: parseInt(routeMarker.time, 10)
  };
};

const responsesToJourney = (
  balanced: JourneyResponse,
  fastest: JourneyResponse,
  quietest: JourneyResponse
): Journey => {
  const routes = {
    balanced: transformResponse(balanced),
    fastest: transformResponse(fastest),
    quietest: transformResponse(quietest)
  };

  const bbox: BBox = [
    Math.min(
      routes.balanced.bbox[0],
      routes.fastest.bbox[0],
      routes.quietest.bbox[0]
    ),
    Math.min(
      routes.balanced.bbox[1],
      routes.fastest.bbox[1],
      routes.quietest.bbox[1]
    ),
    Math.max(
      routes.balanced.bbox[2],
      routes.fastest.bbox[2],
      routes.quietest.bbox[2]
    ),
    Math.max(
      routes.balanced.bbox[3],
      routes.fastest.bbox[3],
      routes.quietest.bbox[3]
    )
  ];

  return {
    routes,
    bbox,
    waypoints: [
      {
        id: uuid(),
        inputValue: balanced.marker[0]["@attributes"].start,
        selection: {
          id: uuid(),
          latitude: parseFloat(
            balanced.marker[0]["@attributes"].start_latitude
          ),
          longitude: parseFloat(
            balanced.marker[0]["@attributes"].start_longitude
          ),
          name: balanced.marker[0]["@attributes"].start,
          near: ""
        },
        optionsQuery: null,
        options: []
      },
      {
        id: uuid(),
        inputValue: balanced.marker[0]["@attributes"].finish,
        selection: {
          id: uuid(),
          latitude: parseFloat(
            balanced.marker[0]["@attributes"].finish_latitude
          ),
          longitude: parseFloat(
            balanced.marker[0]["@attributes"].finish_longitude
          ),
          name: balanced.marker[0]["@attributes"].finish,
          near: ""
        },
        optionsQuery: null,
        options: []
      }
    ]
  };
};

export default responsesToJourney;
