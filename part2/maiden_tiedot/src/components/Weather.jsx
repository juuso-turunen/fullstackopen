import { useEffect } from "react"
import { useState } from "react"
import weatherService from "../services/weather"

const Weather = ({country}) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
            weatherService.getWeather(country.capitalInfo)
            .catch(() => setWeather(null))
            .then(data => setWeather(data))
    }, [country])

    if (! weather) return

    return (
        <div>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature {weather.main.temp} °C</p>
            <img width={100} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
            <p>Wind {weather.wind.speed}</p>
        </div>
    )
}

export default Weather