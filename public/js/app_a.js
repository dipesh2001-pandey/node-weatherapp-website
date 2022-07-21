//element selectors
const weatherform = document.querySelector("form");
const search = document.querySelector("input");
const place = document.querySelector(".flex-grow-1");
const temperature = document.querySelector(".temperature");
const weatherdescp = document.querySelector(".apparent_wether");
const windsped = document.querySelector(".windspeed");
const winddirn = document.querySelector(".direction");
const humidity = document.querySelector(".humidity");
const uv = document.querySelector(".ulv");
const weather_image = document.querySelector(".wimage");
const time = document.querySelector(".time");
const disp = document.querySelector(".error");

///////////////////////////////////////////
weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  disp.textContent = ".....Loading";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json(response).then((data) => {
        if (data.error) {
          disp.textContent = data.error;
          place.textContent = `Place:`;
          weatherdescp.innerHTML = ` <br/> Feels like °C`;
          temperature.textContent = ` °C`;
          windsped.textContent = ` Km/h`;
          winddirn.textContent = ``;
          humidity.textContent = ` %`;
          uv.textContent = `UV:`;
          time.textContent = `Time: `;
          weather_image.src = `https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp`;
        } else {
          disp.textContent = "";

          place.textContent = `Place: ${data.location}`;
          weatherdescp.innerHTML = `${data.forecast.weather_description} <br/> Feels like ${data.forecast.feelslike}°C`;
          temperature.textContent = `${data.forecast.temperature} °C`;
          windsped.textContent = `${data.forecast.wind_speed} Km/h`;
          winddirn.textContent = `${data.forecast.wind_dirn}`;
          humidity.textContent = `${data.forecast.humidity}%`;
          uv.textContent = `UV: ${data.forecast.uv_index}`;
          time.textContent = `Time: ${data.forecast.observation_time}`;
          weather_image.src = `${data.forecast.weather_icons[0]}`;
        }
      });
    }
  );
});
