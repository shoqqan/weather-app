import {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import {fetchCityName} from "../../api/api";
import {Weather} from "../Weather/Weather";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store.ts";
import {setCurrentWeatherThunk, setForecastWeatherThunk} from "../../store/reducers/appReducer.ts";
import {WeatherInfo} from "../../models/apiResponce.ts";

export const HomePage = () => {
    const currentWeather = useSelector<AppStateType, WeatherInfo | null>(state => state.appReducer.currentWeather)
    const forecastWeather = useSelector<AppStateType, WeatherInfo[]>(state => state.appReducer.weatherForecast)
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<any>()
    const loadWeather = (city: string) => {
        if (!city) return;
        dispatch(setCurrentWeatherThunk(city))
        dispatch(setForecastWeatherThunk(city))
        // API.getCurrentWeatherData(city).then(res => setCurrentWeather(res.data));
        // API.getForecastWeatherData(city).then(res => setForecastWeather(res.data.list.filter(item => item.dt_txt.includes("15:00:00"))));
    };

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError("")
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            loadWeather(title);
        }
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async position => {
            const {latitude, longitude} = position.coords;
            try {
                const city = await fetchCityName(latitude, longitude);
                setTitle(city);
                loadWeather(city);
            } catch (error) {
                console.error(error);
                setError('Unable to retrieve your location.');
            }
        }, (error) => {
            console.error(error);
            setError('Unable to retrieve your location.');
        });
    }, []);

    return (
        <div className={'w-screen h-screen overflow-hidden flex flex-col items-center'}>
            <div className={'w-1/2 flex flex-col gap-5 p-10 text-lg'}>
                <input type="text" value={title} onChange={onChangeHandler} onKeyUp={onKeyPressHandler}
                       placeholder={'Enter location'}
                       className={'px-4 py-2 rounded-2xl border focus:outline-none shadow-md'}/>
                {error && <p className={'text-red-600 font-medium mb-2'}>{error}</p>}
            </div>
            {currentWeather && <Weather weatherInfo={currentWeather} forecastWeather={forecastWeather}/>}
        </div>
    );
};
