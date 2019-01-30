import React, { Component } from "react";
import "./App.css";

import moment from "moment";

import WeatherDisplay from "components/WeatherDisplay";
import CitySelect from "components/CitySelect";

const API_KEY = "74ceac1de02ecbbfa3ba3c53223788db";
const base_URL = "https:/api.openweathermap.org/data/2.5/";
const city_ID = [
  {
    id: 2643743,
    name: "London",
    country: "GB",
    coord: {
      lon: -0.12574,
      lat: 51.50853
    }
  },
  {
    id: 2968815,
    name: "Paris",
    country: "FR",
    coord: {
      lon: 2.3486,
      lat: 48.853401
    }
  },
  {
    id: 6695624,
    name: "Warszawa",
    country: "PL",
    coord: {
      lon: 21.04191,
      lat: 52.23547
    }
  },
  {
    id: 6359304,
    name: "Madrid",
    country: "ES",
    coord: {
      lon: -3.68275,
      lat: 40.489349
    }
  },
  {
    id: 2950159,
    name: "Berlin",
    country: "DE",
    coord: {
      lon: 13.41053,
      lat: 52.524368
    }
  },
]

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      isLoading: false,
      countryId: false,
      fetchedCountry:false
      
    };
  }

  componentDidMount() {
    this.setState({cityList: city_ID})
  }

  handleChange = (e) => {
    console.log(e.target);
    
    this.setState({ countryId: e.target.value });
  }


  handleFetch = (id) => {

    this.setState({
      isLoading: true,
      fetchedCountry: id
    });
    
    let header = new Headers({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "multipart/form-data"
    });

    fetch(
      `${base_URL}forecast?id=${
        id
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
    
    const { isLoading, data, countryId, error, cityList, fetchedCountry } = this.state;


    if(isLoading === false && data){
      return (
        <div className="App">
        <div className="flex select">
        {cityList && <CitySelect fn={this.handleChange} cities={cityList} />}
        {countryId && <p className="button" onClick={()=>{
          this.handleFetch(countryId);
        }}>GET DATA</p>}
        </div>
          <WeatherDisplay cityList={cityList} countryId={fetchedCountry} data={data} />
        </div>
      );
    } else if(error){
      return (
       <div className="App">
       <div className="flex select">
       {cityList && <CitySelect fn={this.handleChange} cities={cityList} />}
       {countryId && <p className="button" onClick={()=>{
         this.handleFetch(countryId);
       }}>GET DATA</p>}
       </div>
       <p>Oops, something Went wrong! Be sure to add your private API key and try again later.</p>
      </div>
      );
    }
    return (
      <div className="App">
      <div className="flex select">
      {cityList && <CitySelect fn={this.handleChange} cities={cityList} />}
      {countryId && <p className="button" onClick={()=>{
        this.handleFetch(countryId);
      }}>GET DATA</p>}
      </div>
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
