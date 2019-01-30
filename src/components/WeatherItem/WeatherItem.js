import React, { Component } from "react";
import "./WeatherItem.css";

import moment from "moment";

export default class WeatherItem extends Component {
  render() {
    const {
      dt,
      weather,
      main: { humidity, pressure, temp, temp_max, temp_min }
    } = this.props.data;
    const img = weather[0].icon;
    const description = weather[0].description;

    const dateFormat = "HH:ss";

    return (
      <div className="hour">
        <p className="bold">{`Time: ${moment.unix(dt).format(dateFormat)}`}</p>
        <div className="flex">
          <img
            className="ico"
            alt={description}
            src={`http://openweathermap.org/img/w/${img}.png`}
          />{" "}
          {description}
        </div>
        <p>{`Average temp ${temp} °C | Min temp ${temp_min} °C | Max temp ${temp_max} °C | Humidity: ${humidity} % | Pressure ${pressure} hPa`}</p>
      </div>
    );
  }
}
