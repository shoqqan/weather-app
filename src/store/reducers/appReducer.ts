import {AppAction, AppStore} from "../../models/appStore.ts";

const initialState: AppStore = {
    isLoading: false,
    currentWeather: null,
    weatherForecast: []
}


export const appReducer = (state: AppStore = initialState, action: AppAction) => {
    switch (action.type) {
        case "SET-LOADING":
            return {...state, isLoading: action.isLoading}
        default: {
            return state
        }
    }
}

