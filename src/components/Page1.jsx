import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

;

const Page1 = () => {
  const citykey = "a93411c562a250183d319e9c9991fe16";
  const [load, setload] = useState(0); //maintaining error state
  const [city, setcity] = useState("");
  const [text, settext] = useState("");
  const [input, setinput] = useState("");
  const [object, setobject] = useState({});
  function defaultlocation() {
    const getlocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getUserLocation);
      } else {
        console.log("failed to fetch information");
      }
    };

    const getUserLocation = (position) => {
      const longitude = position.coords.longitude;
      const latitude = position.coords.latitude;
      //pass this info to api request for getting city names

      getcitythroughapi(longitude, latitude);
    };

    const getcitythroughapi = async (longitude, latitude) => {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${citykey}`
      );

      let cityname = response.data[0].name;

      if (text ==="") {
        setcity(cityname);
        data(cityname);
      } else {
        setcity(text);

        data(city);
      }
    };

    getlocation();

    
  }

  useEffect(() => {
    defaultlocation();
  }, [city]);

  const data = async (cityname) => {
    try {
      const key = "17322e540dee47cb93373426240111";

      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${cityname}`
      );
      let currentinfo = response.data.current;
      let forecastinfo = response.data.forecast.forecastday[0];
      setobject({
        temp: currentinfo.temp_c,
        maxtemp: forecastinfo.day.maxtemp_c,
        mintemp: forecastinfo.day.mintemp_c,
        day: currentinfo.condition.text,
        humidity: currentinfo.humidity,
        wind: currentinfo.wind_kph,
        sunrise: forecastinfo.astro.sunrise,
        sunset: forecastinfo.astro.sunset,
      });

     
    } catch (error) {
     
      setload(1);
      
    }
  };

  const handlechange = (e) => {
    settext(e.target.value);
  };

  const submithandler = (e) => {
    e.preventDefault();
    const formattedinput = text.charAt(0).toUpperCase() + text.slice(1)

    
    setload(0);
    setcity(formattedinput)
    setinput(formattedinput)
    data(formattedinput)
    
 
  };

  return (
    <>
      <div className="flex items-center justify-center ">
        <form
          action=""
          onSubmit={submithandler}
          className="left  p-6 flex items-center justify-center w-[60vw] rounded-2xl relative gap-16 border f "
        >
          <input
            type="text"
            name=""
            id=""
            onChange={handlechange}
            value={text}
            className="w-[70%] p-4 rounded-xl outline-none "
            placeholder="Enter City "
          />
          <button className="border p-2 w-40 rounded-xl text-white">
            {" "}
            search city
          </button>
        </form>
      </div>

      {load == 1 ? (
        <div className="text-2xl mt-4 flex items-center justify-center">
          <h1>Cannot find {input}</h1>
        </div>
      ) : (
        <div className="  flex justify-center items-center mt-10  ">
          <div
            id="animate"
            className="container w-[60vw] p-3  h-[30vw] rounded-2xl border-2 shadow-lg info"
          >
            <h1 className="text-4xl text-center mt-2 border-b-2 h-[4vw]  hhh">
              {input == "" ? city : input}
            </h1>

            <div className="temp flex justify-between gap-4 mt-10 dd">
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h ">
                Temperature : {object.temp} C
              </h1>
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h">
                Humidity : {object.humidity}%
              </h1>
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h">
                Wind : {object.wind} KPH
              </h1>
            </div>
            <div className="temp flex justify-between gap-4 mt-10 dd">
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h">
                Sunrise : {object.sunrise}
              </h1>
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h">
                Sunset : {object.sunset}{" "}
              </h1>
            </div>
            <div className="temp flex justify-between gap-4 mt-16 dd">
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h">
                Min Temp : {object.maxtemp} C
              </h1>
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h">
                Max Temp : {object.mintemp} C
              </h1>
              <h1 className="text-2xl  mt-2 border-b-2 p-2 w-[30vw] h">
                Day : {object.day}
              </h1>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page1;
