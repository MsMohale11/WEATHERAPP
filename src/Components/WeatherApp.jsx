import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
    const [city, setCity] = useState("");
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const API_KEY = "be97c59d086b45bc695da756bae3e968";

    const getWeather = async () => {
        if (!city.trim()) {
            alert("Please enter your city!");
            return;
        }

        const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

        setLoading(true);
        setError("");
        setWeatherInfo(null);

        try {
            const response = await axios.get(URL);
            setWeatherInfo(response.data);
        } catch (err) {
            setError("Error fetching weather data. Please try again!");
        } finally {
            setLoading(false);
        }
    };

    const renderWeatherCard = () => {
        if (!weatherInfo) return null;

        const data = weatherInfo;
        const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        let bgClass = "bg-gray-700 text-white";
        if (data.main.temp < 8) {
            bgClass = "bg-blue-900 text-white";
        } else if (data.main.temp > 20) {
            bgClass = "bg-white text-black";
        }

        return (
            <div className={`p-6 rounded-xl border-1 shadow-xl transition-all duration-300 ${bgClass}`}>
                <h2 className="text-2xl font-semibold mb-3">
                    Location: {data.name}, {data.sys.country}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="border-2 shadow-xl  rounded-xl p-2 border-gray-100">
                        <p className="text-lg">Temperature: {data.main.temp}°C</p>
                        <p className="text-lg">Weather: {data.weather[0].description}</p>
                        <img src={iconURL} alt="Weather icon" className="w-16 h-16 mt-2" />
                    </div>
                    <div className="border-2 shadow-xl rounded-xl p-2 border-gray-100">
                        <p className="text-lg">Humidity: {data.main.humidity}%</p>
                        <p className="text-lg">Wind Speed: {data.wind.speed} m/s</p>
                        <p className="text-lg">Visibility: {data.visibility / 1000} km</p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-blue-900 min-h-screen flex items-center justify-center">
            <div className="container max-w-screen-sm mx-auto p-8 bg-white rounded-xl">
                <h1 className="text-3xl font-bold text-center mb-6">WEATHER APP</h1>

                <div className="mb-4">
                    <label htmlFor="inputCity" className="text-md font-semibold">
                        Enter Your City
                    </label>
                    <input
                        type="text"
                        id="inputCity"
                        className="mt-3 p-3 border-3 rounded-xl w-full focus:outline-none focus:ring hover:shadow-xl focus:border-black"
                        placeholder="Delhi"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                <button
                    onClick={getWeather}
                    className="bg-blue-900 text-white p-3 mt-2 rounded-xl focus:ring focus:border border-blue-900"
                >
                    Get Weather
                </button>

                <div className="mt-5 text-gray-700">
                    {loading && <p className="text-blue-600">Loading weather data...</p>}
                    {error && <p className="text-red-700">{error}</p>}
                    {renderWeatherCard()}
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
