import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const api_key = import.meta.env.VITE_OWM_KEY;

const getWeather = (country) => {
    const request = axios.get(baseUrl, {
        params: {
            lat: country.latlng && country.latlng[0],
            lon: country.latlng && country.latlng[1],
            units: "metric",
            appid: api_key,
        },
    });

    return request.then((response) => response.data);
};

export default { getWeather };
