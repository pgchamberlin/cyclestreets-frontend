import { PlanType, JourneyResponse } from "./model/CycleStreets";

const API_BASE_URL = "https://www.cyclestreets.net/api/";

export const apiRequest = async (
  endpoint: string,
  params: { [key: string]: any }
) => {
  const defaultParams = {
    key: process.env.REACT_APP_CYCLESTREETS_API_KEY as string
  };

  const mergedParams = {
    ...defaultParams,
    ...params
  };

  const paramsString = new URLSearchParams(mergedParams).toString();

  const url = `${API_BASE_URL}${endpoint}.json?${paramsString}`;

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

  const journeyResponse: JourneyResponse = await apiRequest("journey", {
    plan,
    itinerarypoints: itineraryPointsString
  });

  return journeyResponse;
};

export const getExistingJourney = async (plan: PlanType, itinerary: string) => {
  const journeyResponse: JourneyResponse = await apiRequest("journey", {
    plan,
    itinerary
  });

  return journeyResponse;
};
