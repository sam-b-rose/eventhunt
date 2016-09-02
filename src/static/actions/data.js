import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    SELECT_CATEGORY,
    RECEIVE_CATEGORIES,
    FETCH_EVENTS_REQUEST,
    RECEIVE_EVENTS,
    UPDATE_LOCATION
} from '../constants';

/**
* Category Actions
*/
export function receiveCategories(data) {
    return {
        type: RECEIVE_CATEGORIES,
        payload: data
    };
}

export function fetchCategories() {
    return (dispatch, state) => {
        return fetch(`${SERVER_URL}/api/v1/categories/`, {
            headers: {
                Accept: 'application/json'
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(data => {
            dispatch(receiveCategories(data));
        })
        .catch(error => {
            if (error.response.status === 401) {
                dispatch(push('/'));
            }
        });
    };
}

/**
* Event Actions
*/
export function receiveEvents(data) {
    return {
        type: RECEIVE_EVENTS,
        payload: data
    };
}

export function fetchEventsRequest() {
    return {
        type: FETCH_EVENTS_REQUEST
    };
}

export function fetchEvents() {
    return (dispatch, state) => {
        const { categories, location } = state().data;

        const catList = categories.filter((category) => {
            return category.selected;
        }).map((category) => {
            return category.id;
        }).join(',');

        dispatch(fetchEventsRequest());
        return fetch(`${SERVER_URL}/api/v1/events/`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                categories: catList,
                latitude: location ? location.latitude : null,
                longitude: location ? location.longitude : null,
            })
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(data => {
            dispatch(receiveEvents(data));
        })
        .catch(error => {
            if (error.response.status === 401) {
                dispatch(push('/'));
            }
        });
    };
}

/**
* Select Category
*/
export function updateSelectedCategories(selectedCategory) {
    return {
        type: SELECT_CATEGORY,
        payload: {
            data: selectedCategory
        }
    };
}

export function selectCategory(selectedCategory) {
    return (dispatch, state) => {
        dispatch(updateSelectedCategories(selectedCategory));
        dispatch(fetchEvents());
    };
}

export function updateLocation(coords) {
    return {
        type: UPDATE_LOCATION,
        payload: coords
    };
}
