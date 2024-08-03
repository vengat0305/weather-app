import "./App.css";

import { useState, useEffect } from "react";
// images
import searchIcon from "../src/assets/searching.png";
import cloudyIcon from "../src/assets/cloudy.png";
import humidityIcon from "../src/assets/humidity.png";
import rainyIcon from "../src/assets/rainy-day.png";
import snowIcon from "../src/assets/snow.png";
import sunCloudIcon from "../src/assets/suncloud.png";
import sunIcon from "../src/assets/sun.png";
import windIcon from "../src/assets/wind.png";

// Weather Components :

const WeatherDetails = ({
  icon,
  temp,
  city,
  country,
  lat,
  long,
  humidity,
  wind,
}) => {
  return (
    <div>
      <div className="weatherImage">
        <img src={icon} className="imagePng" alt="search"></img>{" "}
      </div>
      <div className="temp">{temp}°C</div>
      <div className="location">{city}</div>
      <div className="country">{country}</div>
      <div className="cord">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="long">longitude</span>
          <span>{long}</span>
        </div>
      </div>
      <div className="dataContainer">
        <div className="element">
          <img src={humidityIcon} className="humidityIcon" alt="humidity"></img>
          <div className="data">
            <div className="humidityPercentage">{humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={windIcon} className="windIcon" alt="wind"></img>
          <div className="data">
            <div className="windPercentage">{wind} Km hr</div>
            <div className="text">wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  let apiKey = "7b02de8bf16f63848a5ff3d9a4c552fd";
  const [text, setText] = useState("chennai");
  const [icon, setIcon] = useState(cloudyIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(85);
  const [wind, setWind] = useState(5);
  const [cityNotFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const weatherIconMap = {
    "01d": sunIcon,
    "01n": sunIcon,
    "02d": sunIcon,
    "02n": sunIcon,
    "03d": cloudyIcon,
    "03n": cloudyIcon,
    "04d": cloudyIcon,
    "04n": cloudyIcon,
    "09d": rainyIcon,
    "09n": rainyIcon,
    "010d": rainyIcon,
    "010n": rainyIcon,
    "013d": snowIcon,
    "013n": snowIcon,
  };

  const search = async () => {
    setLoading(true);
    //  `https://weather-api-by-any-city.p.rapidapi.com/weather/${text}`
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      // console.log(res);
      // console.log(data);
      if (data.cod === "404") {
        console.error("City not found!");
        setNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setLong(data.coord.lon);

      const weatherIconCode = data.weather[0].icon;
      setIcon(weatherIconMap[weatherIconCode] || sunIcon);
      setNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred fetching while weather data.");
    } finally {
      setLoading(false);
    }
  };

  function handleCity(e) {
    setText(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }

  useEffect(() => {
    search();
  }, []);
  return (
    <div className="mainContainer">
      <h1 style={{ textAlign: "center" }}>Weather project !</h1>
      <div className="container">
        <div className="inputContainer">
          <input
            type="text"
            className="city"
            placeholder="search city.."
            onChange={handleCity}
            value={text}
            onKeyDown={handleKeyDown}
          />
          <div className="searchIcon" onClick={() => search()}>
            <img src={searchIcon} className="searchIconPng" alt="search"></img>
          </div>
        </div>

        {loading && <div className="loadingMessage">Loading..</div>}
        {error && <div className="errorMessage">{error}</div>}
        {cityNotFound && (
          <div className="citNotFoundMessage">City Not Found!</div>
        )}
        {/* weather image */}
        {!loading && !cityNotFound && (
          <WeatherDetails
            icon={icon}
            temp={temp}
            city={city}
            country={country}
            lat={lat}
            long={long}
            humidity={humidity}
            wind={wind}
          />
        )}
        <p
          style={{ textAlign: "center", color: "gray", fontSize: "15px" }}
          className="copyright"
        >
          <span>Designed by Vengat!</span>
        </p>
      </div>
    </div>
  );
}

export default App;
