import React, { Component } from "react";
import "./WeatherItem.css";

import moment from "moment";

export default class WeatherItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { dt, main:{humidity, pressure, temp, temp_max, temp_min} } = this.props.data;
    const dateFormat = "HH:ss";

    return (
      <div className="hour">
        <p className="bold">{`Time: ${moment.unix(dt).format(dateFormat)}`}</p>
        <p>{`Average temp ${temp} °C | Min temp ${temp_min} °C | Max temp ${temp_max} °C | Humidity: ${humidity} % | Pressure ${pressure} hPa`}</p>
      </div>
    );
  }
}