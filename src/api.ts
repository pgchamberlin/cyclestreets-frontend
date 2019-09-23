import {
  PlanType,
  JourneyResponse,
  GeocodeResponse
} from "./model/CycleStreets";

const API_V1_BASE_URL = "https://www.cyclestreets.net/api/";
const API_V2_BASE_URL = "https://api.cyclestreets.net/v2/";

export const apiRequest = async (
  endpoint: string,
  params: { [key: string]: any },
  v2Api: boolean = false
) => {
  const defaultParams = {
    key: process.env.REACT_APP_CYCLESTREETS_API_KEY as string
  };

  const mergedParams = {
    ...defaultParams,
    ...params
  };

  const paramsString = new URLSearchParams(mergedParams).toString();

  const apiBaseUrl = v2Api ? API_V2_BASE_URL : API_V1_BASE_URL;

  const url = `${apiBaseUrl}${endpoint}?${paramsString}`;

  const response = await fetch(url);
  const body = await response.json();

  return body;
};

export const getNewJourney = async (
  plan: PlanType,
  itineraryPoints: { longitude: number; latitude: number; name?: string }[]
) => {
  const itineraryPointsString = itineraryPoints
    .map(({ longitude, latitude, name }) =>
      [longitude, latitude, name].join(",")
    )
    .join("|");

  const journeyResponse: JourneyResponse = await apiRequest("journey.json", {
    plan,
    itinerarypoints: itineraryPointsString
  });

  return journeyResponse;
};

export const getExistingJourney = async (plan: PlanType, itinerary: string) =>
  (await apiRequest("journey", {
    plan,
    itinerary
  })) as JourneyResponse;

export const geocode = async (query: string) =>
  (await apiRequest(
    "geocoder",
    {
      q: query,
      bbox: "-0.51864,51.25365,0.28462,51.75365",
      countrycodes: "gb,ie"
    },
    true
  )) as GeocodeResponse;
