import { useState,useEffect } from 'react';
import './App.css';
import TopButtons from './Components/TopButtons'
import InputLocation from './Components/InputLocation';
import DateTime from './Components/DateTime';
import TempAndDetails from './Components/TempAndDetails';
import Forecast from './Components/Forecast';
import getFormattedWeatherData from './Services/WeatherData';

const  App = () => {

  const [query,setQuery] = useState({q:'delhi'}) //Initial Query
  const [units,setUnits] = useState('metric') //Initial Units
  const [weather,setWeather] = useState(null) 

  const getWeather = async () => {
    await getFormattedWeatherData({...query, units}).then((data)=>{
      setWeather(data)
    });
  }

  useEffect(() => {
    getWeather();
  },[query,units])

  let BackGround = ''
  const threshold = units === 'metric' ? 25:60;
  if (!weather){                              //if Else if loop to to determine background color dynamically based on Threshold
    BackGround =  'cool'
  }else if(weather.temp <= threshold){
    BackGround = 'cool'
  }else{
    BackGround = 'hot'
  }
    
  return (
    <div className={`App ${BackGround}`} > {/* Background color added dynamically */}
      <title>Weather Dashboard</title>
      <TopButtons setQuery = {setQuery}/>
      <InputLocation setQuery = {setQuery} setUnits = {setUnits}/>
      {weather && (
        <>
          <DateTime weather = {weather}/>
          <TempAndDetails  weather = {weather} units = {units}/>
          <Forecast title = '3 HOUR STEP FORECAST' data = {weather.hourly} />
          <Forecast title = 'DAILY FORECAST' data = {weather.daily} />
        </>
      )}
    </div>
  );
}

export default App;
