import { SearchAction, GEOCODE_REQUEST, GEOCODE_SUCCESS } from '../actions/search';
import { statement } from '@babel/template';

export interface SearchState {}

const initialSearchState: SearchState = {};

const searchReducer = (state: SearchState = initialSearchState, action: SearchAction): SearchState => {
    switch(action.type) {
        case GEOCODE_REQUEST:
        case GEOCODE_SUCCESS:
        default:
            return statement;
    }
}

export default searchReducer;