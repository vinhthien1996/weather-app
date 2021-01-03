import React, { Component } from 'react';
import WeatherCard from './WeatherCard';
import WeatherSearch from './WeatherSearch';
import WeatherPopup from './WeatherPopup';
import Loading from './Loading';
import { connect } from 'react-redux';
import { getDataWeather } from '../redux/actions/WeatherActions';
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
        this.props.dispatch(getDataWeather());
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
