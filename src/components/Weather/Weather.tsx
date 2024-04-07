import * as React from "react";
import {WeatherInfo} from "../../models/apiResponce.ts";

interface WeatherProps {
    weatherInfo: WeatherInfo,
    forecastWeather: WeatherInfo[]
}

const daysOfWeek = ["SUN", "MON", "TUE", "WEN", "THU", "FRI", "SAT"];

export const Weather: React.FC<WeatherProps> = ({weatherInfo, forecastWeather}) => {
    return (
        <div>
            <div className={'w-fit h-fit bg-blue-300 shadow-lg rounded-xl m-auto relative px-6 top-[6%]'}>
                <div className="flex justify-between w-full">
                    <div className="my-4 mx-auto flex justify-between items-center">
                        <div className="flex flex-col items-start justify-between bg-blue-200 rounded-lg p-4 h-full">
                            <div>
                                <p className={'text-lg'}>
                                    {weatherInfo.name},
                                    {weatherInfo.sys.country}
                                </p>
                                <p className='text-sm'>
                                    {weatherInfo.weather[0].description}
                                </p>
                            </div>
                            <div className="relative">
                                <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                                     alt=""
                                     className={'w-[120px]'}/>
                            </div>
                            <div>
                                <h1 className="text-6xl font-semibold">
                                    {weatherInfo.main.temp.toFixed()} ℃
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2 flex flex-col justify-evenly items-end">

                        <div className="flex flex-col justify-evenly gap-y-2 my-4 mx-auto text-xs">
                            <div className="flex justify-between gap-x-8">
                                <p>Feels Like</p>
                                <p className='font-bold w-20'>
                                    {weatherInfo.main.feels_like.toFixed()} ℃
                                </p>
                            </div>
                            <div className="flex justify-between gap-x-8">
                                <p>Humidity</p>
                                <p className='font-bold w-20'>
                                    {weatherInfo.main.humidity.toFixed()} %
                                </p>
                            </div>
                            <div className="flex justify-between gap-x-8">
                                <p>Wind Speed</p>
                                <p className='font-bold w-20'>
                                    {weatherInfo.wind.speed.toFixed()} km/h
                                </p>
                            </div>
                            <div className="flex justify-between gap-x-8">
                                <p>Pressure</p>
                                <p className='font-bold w-20'>
                                    {weatherInfo.main.pressure.toFixed()} hPa
                                </p>
                            </div>
                        </div>
                        <div className="w-full flex gap-5 justify-between items-center">
                            {forecastWeather.map((el) =>{
                                const date = new Date(el.dt_txt)
                                return (
                                    <div className={'flex justify-center shadow-md items-center transition-all flex-col rounded-lg p-4 bg-amber-50 hover:shadow-2xl'}>
                                        <h2>{daysOfWeek[date.getDay()]}</h2>
                                        <div className="relative">
                                            <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                                                 alt=""
                                                 className={'w-[120px]'}/>
                                        </div>
                                        <p>{el.main.feels_like.toFixed()} ℃</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};


