import React, { Component } from 'react';
import Axios from 'axios';
import { API_KEY } from '../consts/Key';
import { connect } from 'react-redux';

class WeatherSearch extends Component {

    searchWeather = async () => {
        this.props.dispatch({
            type: 'ENABLE_SEARCH_LOADING'
        });

        const city = document.querySelector('#city').value;
        try {
            const today = await Axios({
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
                method: 'GET'
            });

            const tomorow = await Axios({
                url: `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`,
                method: 'GET'
            });

            this.props.dispatch({
                type: 'DISABLE_SEARCH_LOADING'
            });

            this.props.dispatch({
                type: 'GET_WEATHER',
                today: today.data,
                tomorow: tomorow.data
            });
        } catch (error) {
            alert("Dữ liệu sai hoặc không thể lấy được thời tiết ở đây!");
            this.props.dispatch({
                type: 'DISABLE_SEARCH_LOADING'
            });
        }
    }

    enterSearch = (event) => {
        if (event.keyCode === 13) {
            this.searchWeather();
        }
    }

    render() {
        return (
            <div className="search-container">
                <input type="text" className="input-search" onKeyUp={this.enterSearch} id="city" placeholder="City..." />
                <button className="search-btn" onClick={() => this.searchWeather()}><i className="fa fa-search"></i></button>
            </div>
        )
    }
}

export default connect()(WeatherSearch);