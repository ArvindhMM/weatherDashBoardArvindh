import { formatToLocalTime } from "./formatToLocalTime"

const API_KEY = '68030d106c5856eff051b45212cd9f28'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/'

const getWeatherData = (infoType, searchParams) => {
    const url = new URL(BASE_URL + infoType)
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})

    return fetch(url)
        .then((res) => res.json());
}

const formatCurrent = (data) => {
    const {
        coord: {lat,lon},
        main:{temp,feels_like,temp_min,temp_max,humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed},
        timezone
    } = data;
    console.log('data',data)

    const {main:details,icon} = weather[0]
    const formattedLocalTime = formatToLocalTime(dt, timezone);
    return{
        speed,
        dt,timezone,
        lat,lon,
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity,
        name,
        country,
        sunrise : formatToLocalTime(sunrise,timezone,'hh:mm a'),
        sunset : formatToLocalTime(sunset,timezone,'hh:mm a'),
        details,
        formattedLocalTime,
        icon:`http://openweathermap.org/img/wn/${icon}@2x.png`
    };
    }

const formatForecastWeather = (secs,offset,data) => {
    const hourly  = data.filter((f) => f.dt > secs)
        .slice(0,10)
        .map((f) => ({
            temp:f.main.temp,
            title:formatToLocalTime(f.dt,offset,'hh:mm a'), 
            date:f.dt_txt}))
    
    const daily = data.filter((f) => f.dt_txt.slice(-8) === '00:00:00')
    .map((f) => ({
        temp:f.main.temp,
        title:formatToLocalTime(f.dt,offset,'ccc'), 
        date:f.dt_txt}))

        return {hourly,daily}
}


const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather  = await getWeatherData('weather',searchParams)
    .then(formatCurrent)

    const {dt,lat,lon,timezone} = formattedCurrentWeather;
    console.log('lat',lat,lon)
    const formattedForecastWeather = await getWeatherData('forecast',{lat,lon,units:searchParams.units,})
    .then((d) => formatForecastWeather(dt,timezone,d.list));


    return {...formattedCurrentWeather, ...formattedForecastWeather }
}

export default getFormattedWeatherData