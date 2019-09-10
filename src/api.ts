import { PlanType } from './model/PlanType';

const API_BASE_URL = 'https://www.cyclestreets.net/api/';

export const apiRequest = async (
  endpoint: string,
  params: { [key: string]: any }
) => {
  const defaultParams = {
    key: process.env.REACT_APP_CYCLESTREETS_API_KEY as string,
  };

  const mergedParams = {
    ...defaultParams,
    ...params,
  };

  const paramsString = new URLSearchParams(mergedParams).toString();

  const url = `${API_BASE_URL}${endpoint}.json?${paramsString}`;

  const response = await fetch(url);
  const body = await response.json();

  return body;
};

export const getNewJourney = (
  plan: PlanType,
  itineraryPoints: { longitude: number; latitude: number; name?: string }[]
) => {
  const itineraryPointsString = itineraryPoints
    .map(({ longitude, latitude, name }) =>
      [longitude, latitude, name].join(',')
    )
    .join('|');

  return apiRequest('journey', {
    plan,
    itinerarypoints: itineraryPointsString,
  });
};

export const getExistingJourney = (plan: PlanType, itinerary: string) =>
  apiRequest('journey', { plan, itinerary });
