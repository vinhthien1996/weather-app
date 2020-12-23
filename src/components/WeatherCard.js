import React, { Component } from 'react'
import WeatherMiniCard from './WeatherMiniCard';
import { connect } from 'react-redux';

class WeatherCard extends Component {

    state = {
        isTemp: true
    }

    getGio = () => {
        let today = new Date();
        return ("0" + today.getHours()).slice(-2) + ":" + ("0" + today.getMinutes()).slice(-2);
    }

    getThu = () => {
        let today = new Date();
        let d = today.getDay();
        let days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        return days[d];
    }

    getNgayMai = () => {
        let today = new Date();
        today.setDate(new Date().getDate() + 1);
        let d = today.getDay();
        let days = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
        return days[d];
    }

    getToday = () => {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    }

    renderWeatherTomorow = () => {
        return this.props.tomorow.map((item, index) => {
            return <WeatherMiniCard time={item.time} icon={item.icon} temp={item.nhietDo} key={index} />
        })
    }

    render() {

        return (
            <div className="card__container">
                <div className="card__content">
                    <div className="card__top">
                        <div className="card__top__left">
                            <h2 className="card-city">{this.props.city}</h2>
                            <div className="card-label">{this.getThu()}<span className="card-date"> - {this.getToday()}</span></div>
                            <div className="card-clock">{this.getGio()}</div>
                            <div className="card-des">{this.props.tinhHinh}</div>
                        </div>
                        <div className="card__top__center">
                            <img src={this.props.icon} alt="Weather icon" />
                        </div>
                        <div className="card__top__right">
                            <div className="weather-c">
                                <h3>{this.state.isTemp ? this.props.nhietDo : this.props.doK}</h3>
                                <p><span onClick={() => {
                                    this.setState({
                                        isTemp: true
                                    });
                                }} className={this.state.isTemp ? "temp-span-active" : "temp-span"}>°C</span> / <span onClick={() => {
                                    this.setState({
                                        isTemp: false
                                    });
                                }} className={!this.state.isTemp ? "temp-span-active" : "temp-span"}>°F</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="card__bottom">
                        <WeatherMiniCard time="Ngày mai" icon="http://openweathermap.org/img/wn/03d@2x.png" temp={this.getNgayMai()} />
                        {this.renderWeatherTomorow()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    city: state.WeatherReducer.city,
    nhietDo: state.WeatherReducer.nhietDo,
    icon: state.WeatherReducer.icon,
    tinhHinh: state.WeatherReducer.tinhHinh,
    doK: state.WeatherReducer.doK,
    tomorow: state.WeatherReducer.tomorow
})

export default connect(mapStateToProps)(WeatherCard);