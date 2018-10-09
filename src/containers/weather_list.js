import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Chart from '../components/chart';

class WeatherList extends Component {
  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = _.map(cityData.list.map(weather => weather.main.temp), temp => temp - 273);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humiditys = cityData.list.map(weather => weather.main.humidity);

    return (
      <tr>
        <td key={name}>{name}</td>
        <td><Chart data={temps} color="orange" units="C" /></td>
        <td><Chart data={pressures} color="purple" units="hPa" /></td>
        <td><Chart data={humiditys} color="green" units="%" /></td>
      </tr>
    );
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th>Temperature (C)</th>
            <th>Pressure (hPa)</th>
            <th>Humidity (%)</th>
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderWeather)}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  return ({ weather: state.weather });
}

export default connect(mapStateToProps)(WeatherList);
