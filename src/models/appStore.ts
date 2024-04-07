import {WeatherInfo} from "./apiResponce.ts";

export interface SetLoading {
    type: "SET-LOADING",
    isLoading: boolean
}
export interface SetCurrentWeather{
    type:"SET-CURRENT-WEATHER",
    currentWeather:WeatherInfo
}

export interface SetForecastWeather{
    type:"SET-FORECAST-WEATHER",
    weatherForecast:WeatherInfo[]
}
export interface AppStore {
    isLoading: boolean
    currentWeather: WeatherInfo | null,
    weatherForecast: WeatherInfo[]
}

export type AppAction = SetLoading | SetCurrentWeather | SetForecastWeather