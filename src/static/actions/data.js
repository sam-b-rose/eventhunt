import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    RECEIVE_CATEGORIES,
    RECEIVE_SUBCATEGORIES,
    FETCH_EVENTS_REQUEST,
    RECEIVE_EVENTS,
    UPDATE_LOCATION,
} from '../constants';


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

        // Create string of selected category ID's
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
            data.events.forEach((event) => {
                // Add a computed Category Name property
                event.categoryName = state().data.categories
                .filter((category) => {
                    return event.categoryId === category.id;
                })
                .shift()
                .name;

                // create Google Map URL from Address
                event.mapUrl = [
                    'http://maps.google.com/?q=',
                    encodeURIComponent(event.address),
                ].join('');
            });
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
* Subcategory Actions
*/
export function receiveSubcategories(data) {
    return {
        type: RECEIVE_SUBCATEGORIES,
        payload: data
    };
}

export function fetchSubcategories(id) {
    return (dispatch, state) => {
        return fetch(`${SERVER_URL}/api/v1/categories/${id}/`, {
            headers: {
                Accept: 'application/json'
            }
        })
        .then(checkHttpStatus)
        .then(parseJSON)
        .then(data => {
            dispatch(receiveSubcategories(data));
        })
        .catch(error => {
            if (error.response.status === 401) {
                dispatch(push('/'));
            }
        });
    };
}


/**
* Category Actions
*/
export function receiveCategories(data) {
    return {
        type: RECEIVE_CATEGORIES,
        payload: data
    };
}

export function processCategories(data) {
    return (dispatch, state) => {
        const { subcategories } = state().data;
        const { categories } = data;

        sessionStorage.setItem('categories', JSON.stringify(data));

        // Get Subcategories for all Selected Categories
        categories.forEach((category) => {
            if (category.selected &&
                !subcategories.hasOwnProperty(category.id)) {
                dispatch(fetchSubcategories(category.id));
            }
        });
        dispatch(receiveCategories(data));
    };
}

export function fetchCategories() {
    return (dispatch, state) => {
        const catData = sessionStorage.getItem('categories');

        if (!catData) {
            return fetch(`${SERVER_URL}/api/v1/categories/`, {
                headers: {
                    Accept: 'application/json'
                }
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(data => {
                dispatch(processCategories(data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(push('/'));
                }
            });
        }

        return dispatch(processCategories(JSON.parse(catData)));
    };
}


/**
* Select Category
*/
export function selectCategory(selectedCategory) {
    return (dispatch, state) => {
        // Update selected state of categories
        const categories = state().data.categories.map((category) => {
            if (category.id === selectedCategory.id) {
                category.selected = !category.selected;
            }
            return category;
        });

        dispatch(processCategories({ categories }));
        dispatch(fetchEvents());
    };
}


/**
* Location
*/
export function updateLocation(coords) {
    return {
        type: UPDATE_LOCATION,
        payload: coords
    };
}
