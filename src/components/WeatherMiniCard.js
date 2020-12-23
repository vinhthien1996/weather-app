import React, { Component } from 'react'

export default class WeatherMiniCard extends Component {

    render() {

        const { time, icon, temp } = this.props;

        return (
            <div className="mini-card">
                <div className="mini-time">{time}</div>
                <div className="mini-img">
                    <img src={icon} alt="Weather mini icon" />
                </div>
                <div className="mini-temp">{temp}</div>
            </div>
        )
    }
}
