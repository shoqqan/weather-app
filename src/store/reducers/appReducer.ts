import {AppAction, AppStore, SetCurrentWeather, SetForecastWeather} from "../../models/appStore.ts";
import {WeatherInfo} from "../../models/apiResponce.ts";
import {Dispatch} from "redux";
import {API} from "../../api/api.ts";

const initialState: AppStore = {
    isLoading: false,
    currentWeather: null,
    weatherForecast: []
}

const setCurrentWeatherActionCreator = (currentWeather: WeatherInfo): SetCurrentWeather => ({
    type: "SET-CURRENT-WEATHER",
    currentWeather
})
const setForecastWeatherActionCreator = (weatherForecast: WeatherInfo[]): SetForecastWeather => ({
    type: "SET-FORECAST-WEATHER",
    weatherForecast
})

export const appReducer = (state: AppStore = initialState, action: AppAction) => {
    switch (action.type) {
        case "SET-LOADING":
            return {...state, isLoading: action.isLoading}
        case "SET-FORECAST-WEATHER":
            return {...state, weatherForecast: action.weatherForecast}
        case "SET-CURRENT-WEATHER": {
        }
            return {...state, currentWeather: action.currentWeather}
        default: {
            return state
        }
    }
}

export const setForecastWeatherThunk = (city: string) => async (dispatch: Dispatch) => {
    try {
        const forecastWeather = await API.getForecastWeatherData(city)
        dispatch(setForecastWeatherActionCreator(forecastWeather.data.list.filter(item => item.dt_txt.includes("15:00:00"))))
    } catch (e) {
        console.log(e)
    }
}
export const setCurrentWeatherThunk = (city: string) => async (dispatch: Dispatch) => {
    try {
        const forecastWeather = await API.getCurrentWeatherData(city)
        dispatch(setCurrentWeatherActionCreator(forecastWeather.data))
    } catch (e) {
        console.log(e)
    }
}

