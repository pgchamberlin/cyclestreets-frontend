import {
  PlanType,
  JourneyResponse,
  GeocodeResponse
} from "./model/CycleStreets";

const API_V1_BASE_URL = "https://www.cyclestreets.net/api/";
const API_V2_BASE_URL = "https://api.cyclestreets.net/v2/";

// Generic API request

export const apiRequest = async (
  endpoint: string,
  params: { [key: string]: any },
  v2Api: boolean = false,
  abortSignal?: AbortSignal
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

  try {
    const response = await fetch(url, { signal: abortSignal });
    const body = await response.json();
    return body;
  } catch (error) {
    if (error.name === "AbortError") {
      return null;
    }

    throw error;
  }
};

// Journeys

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
  (await apiRequest("journey.json", {
    plan,
    itinerary
  })) as JourneyResponse;

// Geocoding

let geocodeAbortController: AbortController;

export const geocode = async (query: string) => {
  if (geocodeAbortController) {
    geocodeAbortController.abort();
  }

  geocodeAbortController = new AbortController();

  const geocodeResponse: GeocodeResponse = await apiRequest(
    "geocoder",
    {
      q: query,
      bbox: "-0.51864,51.25365,0.28462,51.75365",
      countrycodes: "gb,ie"
    },
    true,
    geocodeAbortController.signal
  );

  return geocodeResponse;
};
