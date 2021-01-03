import { combineReducers, createStore, applyMiddleware } from 'redux';
import { WeatherReducer } from './WeatherReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    WeatherReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));