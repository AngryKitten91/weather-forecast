import React, { Component } from 'react';
import './App.css';


const API_KEY = '74ceac1de02ecbbfa3ba3c53223788db';
const base_URL = 'https://openweathermap.org/data/2.5/';
const city_ID = {
  poland: {
    id: 798544,
    country: "PL",
    coord: {
      lon: 20,
      lat: 52
    }
  }
};


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      data : [],
      isLoading: true,
    }

  }

  componentDidMount(){

    let header = new Headers({
      'Access-Control-Allow-Origin':'*',
      'Content-Type': 'multipart/form-data'
  });

    fetch(`${base_URL}forecast?id=${city_ID.poland.id}&appid=${API_KEY}`,
    {
      method: "GET",
      mode: 'cors',
      header: header,
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        isLoading: false,
        data: result.results
      });
    })
    .catch(error => {
      this.setState({
        isLoading: false,
        error
      });
});
  }

  handleFetch = ()=>{
    fetch()
    .then()
    .then()
  }

  render() {

    const {isLoading} = this.state;

    return (
      <div className="App">
        {isLoading && <p>Loading...</p>}
        
      </div>
    );
  }
}

export default App;
