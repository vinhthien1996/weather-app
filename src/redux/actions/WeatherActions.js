
import Axios from 'axios';
import { API_KEY } from '../../consts/Key';

const getDataWeather = () => {
    return async (dispatch) => {
        try {
            const today = await Axios({
                url: `http://api.openweathermap.org/data/2.5/weather?q=Ho Chi Minh&appid=${API_KEY}`,
                method: 'GET'
            });

            const tomorow = await Axios({
                url: `http://api.openweathermap.org/data/2.5/forecast?q=Ho Chi Minh&appid=${API_KEY}`,
                method: 'GET'
            });

            dispatch({
                type: 'GET_WEATHER',
                today: today.data,
                tomorow: tomorow.data
            });

            setTimeout(() => {
                dispatch({
                    type: 'DISABLE_LOADING'
                })
            }, 2000);

        } catch (error) {
            alert(error.response.data);
        }
    }
}

const getDataSearchWeather = (city) => {
    return async (dispatch) => {
        dispatch({
            type: 'ENABLE_SEARCH_LOADING'
        });

        try {
            const today = await Axios({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
                method: 'GET'
            });

            const tomorow = await Axios({
                url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
                method: 'GET'
            });

            dispatch({
                type: 'DISABLE_SEARCH_LOADING'
            });

            dispatch({
                type: 'GET_WEATHER',
                today: today.data,
                tomorow: tomorow.data
            });
        } catch (error) {
            alert("Dữ liệu sai hoặc không thể lấy được thời tiết ở đây!");
            dispatch({
                type: 'DISABLE_SEARCH_LOADING'
            });
        }
    }
}

export { getDataWeather, getDataSearchWeather }