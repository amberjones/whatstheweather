import React, {Component} from 'react';
import {FlatList} from 'react-native';
import ForecastCard from './components/ForecastCard';
import {WEATHER_API_KEY} from 'react-native-dotenv';

/*We'll be using 4 variables of state:
 * - The longitude of the user's location
 * - The latitude of the user's location
 * - The forecast returned from the API
 * - An error string indicating if there's been an error in the API response
 * And then initialise these in the constructor for the class
 */
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: '',
    };
  }

  getLocation() {
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
      position => {
        //sets the state of the latitude and longitude to the response
        this.setState(
          prevState => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
          () => {
            this.getWeather();
          },
        );
        // now that we've got the location of the user stored in the state of the application
      },
      error => this.setState({forecast: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
    );
  }

  getWeather() {
    // Construct the API url to call
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      '&units=metric&appid=' +
      WEATHER_API_KEY;
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
        style={{marginTop:20}}
        keyExtractor={item => item.dt_text}
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
