import React, { Component } from "react";
import "./App.css";

import moment from "moment";

import WeatherDisplay from "components/WeatherDisplay";

const API_KEY = "74ceac1de02ecbbfa3ba3c53223788db";
const base_URL = "https:/api.openweathermap.org/data/2.5/";
const city_ID = {
  chicago: {
    "id": 756692,
    "name": "Trzebieszow",
    "country": "PL",
    "coord": {
      "lon": 22.555019,
      "lat": 51.990059
    }
  }
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      isLoading: true,
      countryId: [city_ID]
    };
  }

  componentDidMount() {

    let header = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data"
    });

    fetch(
      `${base_URL}forecast?id=${
        this.state.countryId[0].chicago.id
      }&appid=${API_KEY}&units=metric`,
      {
        method: "GET",
        mode: "cors",
        header: header
      }
    )
      .then(resp => resp.json())
      .then(result => {

        const data = responseReduce(result.list);

        this.setState({
          isLoading: false,
          data: data
        })
      })
      .catch(error => {
        this.setState({
          isLoading: false,
          error
        });
      });
  }

  render() {
    
    const { isLoading, data, countryId } = this.state;

    return (
      <div className="App">
        {isLoading ? <p>Loading...</p> : <div><h1>City: {countryId[0].chicago.name}</h1><WeatherDisplay data={data} /></div>}
      </div>
    );
  }
}

function responseReduce(array) {
  const dayArray = array.reduce((agg, elem, i) => {
    const { dt, weather, main } = elem;

    const dateFormat = "DD, MMMM, YYYY";
    const date = moment.unix(dt).format(dateFormat);
    const finalWeather = {
      dt,
      weather,
      main
    };

    if (agg[date]) {
      agg[date].push(finalWeather);
    } else {
      agg[date] = [finalWeather];
    }

    return agg;

  }, {});
  
  return Object.entries(dayArray);
}
