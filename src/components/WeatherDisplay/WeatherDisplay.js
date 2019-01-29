import React, { Component } from "react";
import "./WeatherDisplay.css";

import WeatherItem from "components/WeatherItem";


export default class WeatherDisplay extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data } = this.props;

    return (
      <div className="WeatherDisplay">
        {data.map((elem, i) => {
          return (
            <div key={i}>
              <p className="day">
                {elem[0]}
              </p>

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
