import React, { Component } from 'react';
import { connect } from 'react-redux';

class WeatherPopup extends Component {

    renderMessage = () => {
        return this.props.message.map((item, index) => {
            return <p key={index}>{item}</p>;
        });
    }

    render() {

        return (
            <div className="popup-container">
                <div className="popup-content">
                    <div className="popup-icon">
                        <img src={this.props.iconTomorow} alt="Popup weather" />
                    </div>
                    <div className="popup-message">{this.renderMessage()}</div>
                    <div className="popup-close"><i className="fa fa-times" onClick={() => {
                        this.props.dispatch({
                            type: 'CLOSE_WARNING'
                        })
                    }}></i></div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    message: state.WeatherReducer.warning.message,
    iconTomorow: state.WeatherReducer.warning.icon
})

export default connect(mapStateToProps)(WeatherPopup);
