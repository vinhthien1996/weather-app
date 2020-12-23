import { combineReducers, createStore } from 'redux';
import { WeatherReducer } from './WeatherReducer';

const rootReducer = combineReducers({
    WeatherReducer
});

export const store = createStore(rootReducer);