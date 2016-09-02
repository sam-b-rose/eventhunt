import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import DataReducer from './reducer_data';

export default combineReducers({
    data: DataReducer,
    routing: routerReducer
});
