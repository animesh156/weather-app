import { useEffect, useState } from "react";

import Spinner from "./components/Spinner";
import { setWeatherName } from "./setWeatherName";
import WeatherDetails from "./components/WeatherDetails";

const env = await import.meta.env;

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const city = "Darbhanga";
    setLoading(true);
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${env.VITE_API_KEY}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
        setLoading(false);
        setWeatherName(result.weather[0].main, setName);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // input search
  const search = () => {
    if (!query.trim() || Number.isInteger(parseInt(query))) {
      alert("Please enter a valid city");
      setQuery("");
      setLoading(false);
    } else {
      setLoading(true);
      fetch(
        `${api.base}weather?q= ${query}&units=metric&APPID=${env.VITE_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          if (result.cod !== 200) {
            setLoading(false);
            alert("City Not Found");
            setQuery("");
          } else {
            setWeather(result);
            setQuery("");
            setLoading(false);
            setWeatherName(result.weather[0].main, setName);
          }
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  if (loading) return <Spinner />;
  return (
    <>
      <div className="search-box flex justify-center  items-center mt-4 mb-8 ">
        <div>
          <input
            type="text"
            className="search-bar placeholder-orange-500 mr-5 border-black dark:border-cyan-300 border-2 rounded-2xl w-auto xl:w-96 dark:bg-black text-white invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500"
            placeholder="Enter City..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyDown={handleKeyDown}
            required
            name="city"
          />
        </div>

        <div>
          <button
            type="button"
            id="search-btn"
            className="text-black bg-green-700focus:outline-none  font-medium rounded-full text-sm px-5 py-3 mt-1 text-center me-2  dark:text-sky-500 dark:bg-black border-2 border-green-500"
            onClick={search}
          >
            Search
          </button>
        </div>
      </div>

      <WeatherDetails weather={weather} name={name} />
    </>
  );
}

export default App;
