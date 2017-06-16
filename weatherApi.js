const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?appid=a985d7b9a7a68ea35e905d16674de926'
const averageUrl = 'http://api.openweathermap.org/data/2.5/forecast?appid=a985d7b9a7a68ea35e905d16674de926'

export const fetchWeather = (lat, lon) => {
  const url = rootUrl + '&lat=' + lat + '&lon=' + lon + '&units=metric'

  return fetch(url)
  .then(res => res.json())
  .then(json => combine(lat, lon, json.main.temp, json.weather[0].main))
}

const fetchAverage = (lat, lon) => {
  const url = averageUrl + '&lat=' + lat + '&lon=' + lon + '&units=metric'

  return fetch(url)
  .then(res => res.json())
  .then(json => getMostCommon(json.list.slice(0, 5).map(item => {return item.weather[0].main})))
}

const getMostCommon = (arr) => {
  console.log(arr)
  return arr.sort((a,b) =>
      arr.filter(v => v===a).length
    - arr.filter(v => v===b).length
  ).pop()
}

const combine = (lat, lon, temp, weather) => {
  return fetchAverage(lat, lon)
    .then(average => ({
      temp: temp,
      weather: weather,
      average: average
    }))
}
