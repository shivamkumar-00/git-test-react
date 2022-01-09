import { useState, useRef } from "react";
const App = () => {
  var [data, setData] = useState([]);
  var [forecast, setforecast] = useState([]);
  var refconatiner = useRef("");
  var arr = [];
  const url =
    "http://api.weatherapi.com/v1/current.json?key=effbdb61c47a48389cf42831210910";
  const forecasturl =
    "http://api.weatherapi.com/v1/forecast.json?key=effbdb61c47a48389cf42831210910";
  var city = "&q=Jamshedpur";
  const search = () => {
    const value = refconatiner.current.value;
    city = url + "&aqi=yes&q=" + value;
    getData(city);
    getForecast(forecasturl + "&aqi=yes&q=" + value + "&days=3");
  };
  const getData = (total) => {
    fetch(total)
      .then((response) => response.json())
      .then((res) => {
        console.log("reponse", res);
        setData({
          name: res.location.name,
          temp: res.current.temp_c,
          condition: res.current.condition.text,
          air: res.current.air_quality.pm10,
          realfeel: res.current.feelslike_c,
          pressure: res.current.pressure_mb,
          uv: res.current.uv,
          wind: res.current.wind_kph,
          winddirection: res.current.wind_dir,
        });
      })
      .catch((err) => {
        console.log("Not valid city name", err);
        setData({});
      });
  };
  const getForecast = (total) => {
    fetch(total)
      .then((response) => response.json())
      .then((res) => {
        // console.log(res);
        var date = new Date();
        var daynumber = date.getDay(),
          currentday = daynumber;
        console.log(daynumber, currentday);
        res.forecast.forecastday.map((single) => {
          if (currentday - daynumber === 0) {
            arr.push({
              day: "Today",
              max: single.day.maxtemp_c,
              min: single.day.mintemp_c,
              img: single.day.condition.icon,
              text: single.day.condition.text,
            });
            currentday++;
          } else if (currentday - daynumber === 1) {
            arr.push({
              day: "Tomorrow",
              max: single.day.maxtemp_c,
              min: single.day.mintemp_c,
              img: single.day.condition.icon,
              text: single.day.condition.text,
            });
            currentday++;
          } else {
            if (currentday === 0) {
              arr.push({
                day: "Sun",
                max: single.day.maxtemp_c,
                min: single.day.mintemp_c,
                img: single.day.condition.icon,
                text: single.day.condition.text,
              });
            } else if (currentday === 1) {
              arr.push({
                day: "Mon",
                max: single.day.maxtemp_c,
                min: single.day.mintemp_c,
                img: single.day.condition.icon,
                text: single.day.condition.text,
              });
            } else if (currentday === 2) {
              arr.push({
                day: "Tue",
                max: single.day.maxtemp_c,
                min: single.day.mintemp_c,
                img: single.day.condition.icon,
                text: single.day.condition.text,
              });
            } else if (currentday === 3) {
              arr.push({
                day: "Wed",
                max: single.day.maxtemp_c,
                min: single.day.mintemp_c,
                img: single.day.condition.icon,
                text: single.day.condition.text,
              });
            } else if (currentday === 4) {
              arr.push({
                day: "Thu",
                max: single.day.maxtemp_c,
                min: single.day.mintemp_c,
                img: single.day.condition.icon,
                text: single.day.condition.text,
              });
            } else if (currentday === 5) {
              arr.push({
                day: "Fri",
                max: single.day.maxtemp_c,
                min: single.day.mintemp_c,
                img: single.day.condition.icon,
                text: single.day.condition.text,
              });
            } else {
              arr.push({
                day: "Sat",
                max: single.day.maxtemp_c,
                min: single.day.mintemp_c,
                img: single.day.condition.icon,
                text: single.day.condition.text,
              });
            }
          }
        });
        setforecast(arr);
      })
      .catch((err) => {
        arr = [];
        setforecast(arr);
        console.log("forecast error", err);
      });
  };

  console.log("inside");
  return (
    <>
      <div className="top">
        <input type="text" className="input" ref={refconatiner} />
        <input
          type="button"
          className="btn"
          value="Search"
          onClick={() => search()}
        ></input>
      </div>
      <div className="total">
        <h4 className="name">{data.name}</h4>
        <br />
        <br />
        <div className="current">
          <h1 className={Object.values(data).length === 0 ? "hide" : "show"}>
            {data.temp}
            °C
          </h1>
          <p>{data.condition}</p>
          <p className={Object.values(data).length === 0 ? "hide" : "show"}>
            AQI : {data.air}
          </p>
        </div>

        <div className="forecast">
          {forecast.map((single) => {
            return (
              <>
                <img src={single.img} alt="text" className="img-single" />
                <p className="single">
                  {single.day}.{single.text}
                </p>
                <p className="singletemp">
                  {single.max}/{single.min}
                </p>
              </>
            );
          })}
        </div>
        <div>
          <p className={Object.values(data).length === 0 ? "hide" : "show"}>
            Details
          </p>
          <hr className={Object.values(data).length === 0 ? "hide" : "show"} />
          <div className="details">
            <div className="tsingle">
              <p>{data.winddirection}</p>
              <p>{data.wind}</p>
            </div>
            <div className="tsingle">
              <p className={Object.values(data).length === 0 ? "hide" : "show"}>
                Real Feel
              </p>
              <p>{data.realfeel}</p>
            </div>
            <div className="tsingle">
              <p className={Object.values(data).length === 0 ? "hide" : "show"}>
                UV INDEX
              </p>
              <p>{data.uv}</p>
            </div>
            <div className="tsingle">
              <p className={Object.values(data).length === 0 ? "hide" : "show"}>
                Pressure{" "}
              </p>
              <p>{data.pressure}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
