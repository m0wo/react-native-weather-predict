import React, { Component } from 'react'
import { Text, View, StyleSheet, AppRegistry, StatusBar } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Highlight from 'react-native-highlight-words'

import { fetchWeather, fetchAverage } from './weatherApi'

const iconNames = {
  Default: 'md-time',
  Clear: 'md-sunny',
  Rain: 'md-rainy',
  Thunderstorm: 'md-thunderstorm',
  Clouds: 'md-cloudy',
  Snow: 'md-snow',
  Drizzle: 'md-umbrella',
}

const phrases = {
  Default: {
    title: "Fetching the weather",
    subtitle: "Patience is a virtue.",
    highlight: "",
    color: '#636363',
    background: '#9C9C9C'
  },
  Clear: {
    title: "It's going to be clear later on.",
    subtitle: "yup",
    highlight: "clear",
    color: '#F9690E',
    background: '#F7CA18'
  },
  Rain: {
    title: "It's going to rain later.",
    subtitle: "Put a coat on",
    highlight: "rain",
    color: '#004A96',
    background: '#2F343A'
  },
  Thunderstorm: {
    title: "There's a storm coming.",
    subtitle: "Get inside",
    highlight: "storm",
    color: '#FBFF46',
    background: '#020202'
  },
  Clouds: {
    title: "It'll be cloudy later.",
    subtitle: "eh",
    highlight: "cloudy",
    color: '#0044FF',
    background: '#939393'
  },
  Snow: {
    title: "Looks like snow is on the way.",
    subtitle: "",
    highlight: "Snow",
    color: '#021D4C',
    background: '#15A678'
  },
  Drizzle: {
    title: "Looks like it's set to be drizzly.",
    subtitle: "",
    highlight: "drizzly",
    color: '#B3F6E4',
    background: '#1FBB68'
  },
}

class App extends Component {

  componentWillMount() {
    this.state = {
      temp: 0,
      weather: 'Default',
      average: 'Default'
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(
      (posData) => fetchWeather(posData.coords.latitude, posData.coords.longitude)
        .then(res => this.setState({
          temp: Math.round(res.temp),
          weather: res.weather,
          average: res.average
        })),
      (error) => alert(error),
      {timeout:10000}
    )
  }

  render() {
    return(
      <View style={[styles.container, {backgroundColor: phrases[this.state.average].background}]}>
        <StatusBar hidden={false} barStyle="light-content"/>
        <View style={styles.header}>
          <Icon name={iconNames[this.state.weather]} size={150} color={'white'}/>
          <Text style={styles.temp}>{this.state.temp}°</Text>
        </View>
        <View style={styles.body}>
          <Highlight
            style={styles.title}
            highlightStyle={{color: phrases[this.state.average].color}}
            searchWords={[phrases[this.state.average].highlight]}
            textToHighlight={phrases[this.state.average].title}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFD017'
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    padding: 40
  },
  temp: {
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: 92,
    color: 'white',
  },
  title: {
    fontFamily: 'HelveticaNeue-light',
    fontSize: 92,
    color: 'white',
    marginTop: 5
  },
  subtitle: {
    fontFamily: 'HelveticaNeue-Medium',
    fontSize: 16,
    color: 'white'
  },
  body: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flex: 5,
    marginLeft: 10,
    marginRight: 10
  }
})

AppRegistry.registerComponent('Weather', () => App)
