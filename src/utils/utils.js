const request = require("request");

const geocode = (address, callback) => {
  const geocodeurl = `http://api.positionstack.com/v1/forward?access_key=99af01f495646a87969e501199ce9203&query=${encodeURIComponent(
    address
  )}&limit=1`;
  request({ url: geocodeurl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location service", undefined);
    } else if (address.length < 3 || body.data.length === 0) {
      callback("Unable to find location, Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].label,
      });
    }
  });
};
const weatherstat = (latitude, longitude, callback) => {
  const weatherurl = `http://api.weatherstack.com/current?access_key=7bdcf0ea820fb773b1c11eeb197c0323&query= ${latitude},${longitude}`;
  request({ url: weatherurl, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(
        "Unable to get data for location, Try another search.",
        undefined
      );
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        humidity: body.current.humidity,
        wind_dirn: body.current.wind_dir,
        feelslike: body.current.feelslike,
        uv_index: body.current.uv_index,
        wind_speed: body.current.wind_speed,
        weather_description: body.current.weather_descriptions[0],
        weather_icons: body.current.weather_icons,
        observation_time: `${body.location.localtime
          .split(" ")[0]
          .split("-")
          .reverse()
          .join("-")}  ${body.location.localtime.split(" ")[1]}`,
      });
    }
  });
};
module.exports = {
  geocode: geocode,
  weatherstat: weatherstat,
};
