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
    } catch {
      setError("❌ Unable to fetch weather data. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const getTheme = (temp) => {
    if (temp < 8) return "from-blue-900 via-blue-700 to-cyan-500";
    if (temp > 25) return "from-yellow-500 via-orange-500 to-red-500";
    return "from-indigo-500 via-blue-500 to-purple-500";
  };

  const renderWeatherCard = () => {
    if (!weatherInfo) return null;

    const data = weatherInfo;
    const iconURL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    const bgGradient = getTheme(data.main.temp);

    return (
      <div
        className={`mt-6 p-6 rounded-2xl shadow-xl bg-gradient-to-br ${bgGradient} text-white animate-fadeIn`}
      >
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-lg capitalize">{data.weather[0].description}</p>
            <p className="text-6xl font-extrabold mt-4">
              {Math.round(data.main.temp)}°C
            </p>
          </div>
          <img src={iconURL} alt="Weather Icon" className="w-28 h-28" />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 text-lg">
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md">
             Feels Like: {Math.round(data.main.feels_like)}°C
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md">
             Humidity: {data.main.humidity}%
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md">
            🌬 Wind: {data.wind.speed} m/s
          </div>
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-md">
             Visibility: {data.visibility / 1000} km
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-black p-4">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/20">
        <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-md tracking-wide">
           Weather Dashboard
        </h1>
        <p className="text-center text-gray-300 mt-2">
          Get real-time weather updates anywhere in the world
        </p>

        <div className="mt-6 flex gap-3">
          <input
            type="text"
            placeholder="Enter city..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/80 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-inner text-gray-800"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow-lg hover:from-indigo-500 hover:to-blue-500 transition-all"
          >
            Search
          </button>
        </div>

        <div className="mt-6">
          {loading && (
            <p className="text-yellow-300 text-center animate-pulse">
              Loading weather data...
            </p>
          )}
          {error && <p className="text-red-300 text-center">{error}</p>}
          {renderWeatherCard()}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
