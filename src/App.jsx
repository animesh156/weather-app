import { useEffect, useState } from "react";

import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

const env = await import.meta.env;

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [name, setName] = useState("");


  useEffect(() => {
    const city = "Darbhanga";
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${env.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");

        if (result.weather[0].main === "Clouds") {
          setName("cloudy");
        } else if (result.weather[0].main === "clear") {
          setName("clear");
        } else if (result.weather[0].main === "Rain") {
          setName("rain");
        } else if (result.weather[0].main === "Thunderstorm") {
          setName("thunder");
        } else if (result.weather[0].main === "Drizzle") {
          setName("drizzle");
        } else if (result.weather[0].main === "Snow") {
          setName("snow");
        } else if (
          result.weather[0].main === "Mist" ||
          result.weather[0].main === "Fog"
        ) {
          setName("mist");
        } else if (result.weather[0].main === "Tornado") {
          setName("tornado");
        } else if (
          result.weather[0].main === "Sand" ||
          result.weather[0].main === "Dust"
        ) {
          setName("sand");
        } else {
          setName("clear");
        }
      });
  }, []);

  const search = () => {
    if (!query.trim() || Number.isInteger(parseInt(query))) {
      alert("Please enter a valid city");
      setQuery("");
    } else {
      fetch(
        `${api.base}weather?q= ${query}&units=metric&APPID=${env.VITE_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          if(result.cod !== 200) {
            alert('City Not Found')
            setQuery('')
          }

           else {
             
          setWeather(result);
          setQuery("");

          if (result.weather[0].main === "Clouds") {
            setName("cloudy");
          } else if (result.weather[0].main === "clear") {
            setName("clear");
          } else if (result.weather[0].main === "Rain") {
            setName("rain");
          } else if (result.weather[0].main === "Thunderstorm") {
            setName("thunder");
          } else if (result.weather[0].main === "Drizzle") {
            setName("drizzle");
          } else if (result.weather[0].main === "Snow") {
            setName("snow");
          } else if (
            result.weather[0].main === "Mist" ||
            result.weather[0].main === "Fog"
          ) {
            setName("mist");
          } else if (result.weather[0].main === "Tornado") {
            setName("tornado");
          } else if (
            result.weather[0].main === "Sand" ||
            result.weather[0].main === "Dust"
          ) {
            setName("sand");
          } else {
            setName("clear");
          }
           }
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div
      className="app h-[540px] w-80  xl:w-96"
      style={{ backgroundImage: `url("/${name}.gif")` }}
    >
      <main>
        <div className="search-box flex justify-evenly  items-center mt-4">
          <input
            type="text"
            className="search-bar placeholder-cyan-600 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            placeholder="Enter City..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyDown}
            required
            name="city"
          />

          <button
            id="search-btn"
            type="button"
            className="text-white bg-yellow-400 hover:bg-yellow-500  font-medium rounded-full text-sm px-3 py-2 text-center h-9"
            onClick={search}
          >
            Search
          </button>
        </div>

        {typeof weather.main != "undefined" ? (
          <div className="mt-14">
            <h1 className="temperature text-white">
              {Math.round(weather.main.temp)}°c
            </h1>
            <p className="text-white location">{weather.weather[0]. description}</p>

            <div className="location-box text-white ">
              <div className="location mt-11">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box text-white mt-10">
              <div className="temp">
                <p className="wind-speed">
                  {Math.round(weather.wind.speed)}km/h{" "}
                  <span>
                    <FaWind />
                  </span>
                </p>

                <p className="humidity">
                  {Math.round(weather.main.humidity)}
                  <span>
                    <WiHumidity size={40} />
                  </span>
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
