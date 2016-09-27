import fetch from 'isomorphic-fetch';
import { push } from 'react-router-redux';

import { SERVER_URL } from '../utils/config';
import { checkHttpStatus, parseJSON } from '../utils';
import {
    RECEIVE_CATEGORIES,
    RECEIVE_SUBCATEGORIES,
    FETCH_EVENTS_REQUEST,
    RECEIVE_EVENTS,
    SET_SELECTED_MODE,
    UPDATE_LOCATION,
} from '../constants';


/**
* Event Actions®
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
        const { categories, subcategories, location } = state().data;

        let updatedSubcategories = subcategories.map((sub) => {
            sub.enabled = false;
            return sub;
        });

        // Create string of selected category ID's
        const categoryList = categories.filter((category) => {
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
                categories: categoryList,
                address: location ? location.address : null,
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

                // Set Subcategories
               if (event.subcategoryId) {
                   updatedSubcategories.forEach((sub) => {
                       sub.enabled = sub.id === event.subcategoryId;
                       return sub;
                   });
               }

                // create Google Map URL from Address
                event.mapUrl = [
                    'http://maps.google.com/?q=',
                    encodeURIComponent(event.address),
                ].join('');
            });
            dispatch(receiveSubcategories({
                subcategories: updatedSubcategories
            }));
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

export function fetchSubcategories() {
    return (dispatch, state) => {
        return fetch(`${SERVER_URL}/api/v1/subcategories/`, {
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

export function saveCategories(data) {
    return (dispatch, state) => {
        const { categories } = data;
        sessionStorage.setItem('categories', JSON.stringify(data));
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
                dispatch(saveCategories(data));
            })
            .catch(error => {
                if (error.response.status === 401) {
                    dispatch(push('/'));
                }
            });
        }

        return dispatch(saveCategories(JSON.parse(catData)));
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

        dispatch(saveCategories({ categories }));
        dispatch(fetchEvents());
    };
}


/**
* Set the view mode
*/
export function setViewMode(mode) {
    return {
        type: SET_SELECTED_MODE,
        payload: mode
    };
}


/**
* Location
*/
export function receiveLocation(location) {
    return {
        type: UPDATE_LOCATION,
        payload: location
    };
}

export function updateLocation(location) {
    return (dispatch, state) => {
        dispatch(receiveLocation(location));
        dispatch(fetchEvents());
    };
}