import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Weathersearch.module.css";

const WeatherCard = ({ title, value }) => {
  return (
    <div className={styles["weather-card"]}>
      <h2>{title}</h2>
      <p>{value}</p>
    </div>
  );
};

function WeatherApp() {
  const [city, setCity] = useState("");
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(input);
  };

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get(`https://api.weatherapi.com/v1/current.json`, {
          params: {
            key: "03394addafd0456c9e472730252704", 
            q: city,
          },
        })
        .then((response) => {
          setWeatherData(response.data);
        //   console.log(response);
        })
        .catch((error) => {
          console.error("Error fetching data", error);
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]); 

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.formpart}>
        <input
          type="text"
          value={input}
          placeholder="Enter city name"
                  onChange={(e) => setInput(e.target.value)}
                  style={{padding:"5px"}}
        />
        <button type="submit" className={styles.btn}>Search</button>
      </form>

      <div>
        {loading && <p>Loading data...</p>}
        {weatherData && (
          <div className={styles["weather-cards"]}>
            {[
              {
                title: "Temperature",
                value: `${weatherData.current.temp_c}°C`,
              },
              { title: "Humidity", value: `${weatherData.current.humidity}%` },
              { title: "Condition", value: weatherData.current.condition.text },
              {
                title: "Wind Speed",
                value: `${weatherData.current.wind_kph} kph`,
              },
            ].map((info, index) => (
              <WeatherCard key={index} title={info.title} value={info.value} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
