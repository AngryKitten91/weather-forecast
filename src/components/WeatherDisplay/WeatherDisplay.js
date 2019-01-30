import React, { Component } from "react";
import "./WeatherDisplay.css";

import WeatherItem from "components/WeatherItem";

export default class WeatherDisplay extends Component {
  render() {
    const { data, countryId, cityList } = this.props;
    const choosenCity = cityList.find(elem => elem.id === parseInt(countryId));
    const {
      name,
      coord: { lat, lon },
      country
    } = choosenCity;

    return (
      <div className="WeatherDisplay">
        <h1>{`City: ${name} (${country}) | Latitude: ${lat} | Longitude: ${lon}`}</h1>
        {data.map((elem, i) => {
          return (
            <div key={i}>
              <p className="day">{elem[0]}</p>

              {elem[1].map((itemElem, itemI) => {
                return <WeatherItem data={itemElem} key={itemI} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
