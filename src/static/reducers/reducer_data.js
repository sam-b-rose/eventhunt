import { createReducer } from '../utils';
import {
    RECEIVE_CATEGORIES,
    RECEIVE_SUBCATEGORIES,
    RECEIVE_EVENTS,
    FETCH_EVENTS_REQUEST,
    UPDATE_LOCATION
} from '../constants';

const initialState = {
    categories: [],
    subcategories: {},
    events: [],
    location: null,
    isFetching: false
};

export default createReducer(initialState, {
    [RECEIVE_CATEGORIES]: (state, payload) => {
        return Object.assign({}, state, {
            categories: payload.categories,
        });
    },
    [RECEIVE_SUBCATEGORIES]: (state, payload) => {
        const subcategories = Object.assign({}, state.subcategories, {
            [payload.category]: payload.subcategories
        });
        return Object.assign({}, state, {
            subcategories
        });
    },
    [RECEIVE_EVENTS]: (state, payload) => {
        return Object.assign({}, state, {
            events: payload.events,
            isFetching: false
        });
    },
    [FETCH_EVENTS_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            isFetching: true
        });
    },
    [UPDATE_LOCATION]: (state, payload) => {
        return Object.assign({}, state, {
            location: {
                latitude: payload.latitude,
                longitude: payload.longitude
            }
        });
    }
});
