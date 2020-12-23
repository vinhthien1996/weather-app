import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import WeatherSearch from './WeatherSearch';
import WeatherPopup from './WeatherPopup';
import Loading from './Loading';
import { connect } from 'react-redux';
import { API_KEY } from '../consts/Key';
import Axios from 'axios';
import SearchLoading from './SearchLoading';

class Weather extends Component {
    render() {
        return (
            <div className="weather">
                {this.props.isLoading && <Loading />}
                {this.props.isSearchLoading && <SearchLoading />}
                <div className="weather__container">
                    <WeatherSearch />
                    <WeatherCard />
                    {this.props.isWarning ? <WeatherPopup /> : ''}
                </div>
            </div>
        )
    }

    getWeather = async () => {
        try {
            const today = await Axios({
                url: `http://api.openweathermap.org/data/2.5/weather?q=Ho Chi Minh&appid=${API_KEY}`,
                method: 'GET'
            });

            const tomorow = await Axios({
                url: `http://api.openweathermap.org/data/2.5/forecast?q=Ho Chi Minh&appid=${API_KEY}`,
                method: 'GET'
            });

            this.props.dispatch({
                type: 'GET_WEATHER',
                today: today.data,
                tomorow: tomorow.data
            });

            setTimeout(() => {
                this.props.dispatch({
                    type: 'DISABLE_LOADING'
                })
            }, 2000);

        } catch (error) {
            alert(error.response.data);

        }
    }

    componentDidMount() {
        this.getWeather();
    };
}

const mapStateToProps = (state) => ({
    isLoading: state.WeatherReducer.isLoading,
    isSearchLoading: state.WeatherReducer.isSearchLoading,
    isWarning: state.WeatherReducer.warning.isWarning
})

export default connect(mapStateToProps)(Weather);
