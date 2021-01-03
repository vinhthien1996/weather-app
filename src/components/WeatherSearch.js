import React, { Component } from 'react';
import { getDataSearchWeather } from '../redux/actions/WeatherActions';
import { connect } from 'react-redux';

class WeatherSearch extends Component {

    searchWeather = async () => {
        const city = document.querySelector('#city').value;
        this.props.dispatch(getDataSearchWeather(city));
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