import { createReducer } from '../utils';
import {
    SELECT_CATEGORY,
    RECEIVE_CATEGORIES,
    RECEIVE_EVENTS,
    FETCH_EVENTS_REQUEST,
    UPDATE_LOCATION
} from '../constants';

const initialState = {
    categories: [],
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
    [SELECT_CATEGORY]: (state, payload) => {
        const selectedCategory = payload.data;

        const categories = state.categories.map((category) => {
            if (category.id === selectedCategory.id) {
                category.selected = !category.selected;
            }
            return category;
        });

        return Object.assign({}, state, {
            categories
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
