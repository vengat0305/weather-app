import "./App.css";

import { useState } from "react";
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
  const [icon, setIcon] = useState(cloudyIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [humidity, setHumidity] = useState(85);
  const [wind, setWind] = useState(5);
  const [cityNotFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);

    // let url = `https://api.openwathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}`;
    let url = `https://api.weatherapi.com/v1/current.json?key=&q=${text}&aqi=no`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log("An error occurred:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const [text, setText] = useState("chennai");
  function handleCity(e) {
    setText(e.target.value);
  }
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      search();
    }
  }
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
        {/* weather image */}
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
