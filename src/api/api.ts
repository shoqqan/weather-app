import axios, {AxiosInstance} from "axios";

const API_KEY = "a848b35091f9519ed4c01a14a10f2570"

const instance = (): AxiosInstance => {

    return axios.create(
        {
            baseURL: "https://api.openweathermap.org",
        }
    )
}
export const API = {
    async getCurrentWeatherData(city: string) {
        try {
            const cityInfo = await instance().get(`geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`)
            const latLon: number[] = [cityInfo.data[0].lat, cityInfo.data[0].lon]
            return instance().get(`data/2.5/weather?lat=${latLon[0]}&lon=${latLon[1]}&units=metric&appid=${API_KEY}`)
        } catch (error) {
            alert(error)
        }
    },
    async getForecastWeatherData(city: string) {
        try {
            return instance().get(`data/2.5/forecast/?q=${city}&cnt=32&units=metric&appid=${API_KEY}`)
        } catch (error) {
            alert(error)
        }
    }
}

export const fetchCityName = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.address.city || data.address.town || data.address.village;
    } catch (error) {
        console.error("Failed to fetch city name", error);
        return null;
    }
};