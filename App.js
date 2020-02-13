import React, {Component} from 'react';
import {FlatList} from 'react-native';
import ForecastCard from './components/ForecastCard';
navigator.geolocation = require('@react-native-community/geolocation');

import {WEATHER_API_KEY} from 'react-native-dotenv';

/*We'll be using 4 variables of state:
 * - The longitude of the user's location
 * - The latitude of the user's location
 * - The forecast returned from the API
 * - An error string indicating if there's been an error in the API response
 * And then initialise these in the constructor for the class
 */

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: '',
    };
  }

  componentDidMount() {
    // Get the user's location
    this.getLocation();
  }

  getLocation() {
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          prevState => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
          () => {
            this.getWeather();
          },
        );
      },
      error => this.setState({forecast: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  getWeather() {
    // Construct the API url to call
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.state.latitude}$&lon=${this.state.longitude}&units=metric&appid=7ba3a2da2c4b1e5b9e08d7c61c7866ed`;

    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState((prevState, props) => ({
          forecast: data,
        }));
      });
  }

  render() {
    return (
      <FlatList
        data={this.state.forecast.list}
        style={{marginTop: 20}}
        keyExtractor={item => item.dt_txt}
        renderItem={({item}) => (
          <ForecastCard
            detail={item}
            location={this.state.forecast.city.name}
          />
        )}
      />
    );
  }
}
