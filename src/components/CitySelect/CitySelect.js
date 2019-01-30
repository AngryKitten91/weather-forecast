import React, { Component } from "react";
import "./CitySelect.css";

export default class CitySelect extends Component {
  render() {
    const { cities, fn } = this.props;

    return (
      <div className="CitySelect">
        <p>Select City</p>
        <select onChange={fn} name="city">
          <option disabled selected value>
            -- select an option --
          </option>
          {cities.map((elem, i) => {
            const { id, name } = elem;

            return (
              <option key={i} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
}
