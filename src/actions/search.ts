export const GEOCODE_REQUEST = 'GEOCODE_REQUEST';
interface GeocodeRequest {
    type: typeof GEOCODE_REQUEST
}
export const geocodeRequest = (): GeocodeRequest => ({
    type: GEOCODE_REQUEST
})

export const GEOCODE_SUCCESS = 'GEOCODE_SUCCESS';
interface GeocodeSuccess {
    type: typeof GEOCODE_SUCCESS;
}
export const geocodeSuccess = (): GeocodeSuccess => ({
    type: GEOCODE_SUCCESS
})

export type SearchAction = GeocodeRequest | GeocodeSuccess;
