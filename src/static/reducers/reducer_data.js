import { createReducer } from '../utils';
import {
    RECEIVE_CATEGORIES,
    RECEIVE_SUBCATEGORIES,
    RECEIVE_EVENTS,
    FETCH_EVENTS_REQUEST,
    SET_SELECTED_MODE,
    UPDATE_INITIAL_LOAD,
    UPDATE_LOCATION,
} from '../constants';

const initialState = {
    categories: [],
    subcategories: [],
    events: [],
    location: {},
    selectedMode: null,
    viewMode: {
        LIST: { value: 0, name: 'List', code: 'L' },
        MAP: { value: 1, name: 'Map', code: 'M' }
    },
    isFetching: false
};

export default createReducer(initialState, {
    [RECEIVE_CATEGORIES]: (state, payload) => {
        return Object.assign({}, state, {
            categories: payload.categories,
        });
    },
    [RECEIVE_SUBCATEGORIES]: (state, payload) => {
        return Object.assign({}, state, {
            subcategories: payload.subcategories
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
    [SET_SELECTED_MODE]: (state, payload) => {
        return Object.assign({}, state, {
            selectedMode: payload
        });
    },
    [UPDATE_LOCATION]: (state, payload) => {
        return Object.assign({}, state, {
            location: {
                address: payload.address ? payload.address : null,
                latitude: payload.latitude ? payload.latitude : null,
                longitude: payload.longitude ? payload.longitude : null
            }
        });
    }
});
