function getWeather() {
  const cityInput = document.getElementById("city");
  const cityName = cityInput.value.trim();

  if (cityName === "") {
    alert("Please enter a city name");
    return;
  }
  
  const apiKey = "091788ccf1de4d3bfd9fd17867e13186";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        alert("City not found");
        return;
      }
      displayWeather(data);
    })
    .catch(error => {
      console.log("Error fetching weather data:", error);
    });
}

function displayWeather(weatherData) {
  const weatherInfoDiv = document.getElementById("weatherInfo");
  weatherInfoDiv.innerHTML = "";

  const weatherInfo = [
    { label: "City Name", value: weatherData.name},
    { label: "Temperature", value: weatherData.main.temp + "°C" },
    { label: "Humidity", value: weatherData.main.humidity + "%" },
    { label: "Description", value: weatherData.weather[0].description }
  ];

  weatherInfo.forEach(info => {
    const infoPara = document.createElement("h5");
    infoPara.textContent = `${info.label}: ${info.value}`;
    weatherInfoDiv.appendChild(infoPara);
  });
}
