import { LineString, BBox } from "geojson";

export interface Route {
  geoJson: LineString;
  bbox: BBox;
  length: number;
  time: number;
}

export type RouteType = 'balanced' | 'fastest' | 'quietest';

export interface Journey {
  routes: {
    balanced: Route;
    fastest: Route;
    quietest: Route;
  };
  bbox: BBox;
}
