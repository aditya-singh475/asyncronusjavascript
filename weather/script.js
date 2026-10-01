const cityInput = document.querySelector("#cityInput")
const searchButton = document.querySelector("#searchBtn")
const error = document.querySelector("#error")
const cityName = document.querySelector("#cityName")
const temperature = document.querySelector("#temperature")
const weatherDescription = document.querySelector("#weatherDescription")
const feelsLike = document.querySelector("#feelsLike")
const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind")
const load = document.querySelector('#loading')

searchButton.addEventListener('click', function () {
    const city = cityInput.value.trim();
    if (!city) {
        error.textContent = "Please enter the city"
        error.style.display = "block"
        return
    }
    load.style.display = "block";

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    fetch(geoUrl).then((rawData) => {
        return rawData.json()
    })
        .then((data) => {
            console.log(data);
            const res = data.results[0]
            cityName.textContent = `${res.name},${res.country}`
            const latitude = res.latitude;
            const longitude = res.longitude;


            const weather = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`;
            fetch(weather).then((a) => {
                return a.json()
            }).then((b) => {
                console.log(b)
                temperature.textContent = b.current.temperature_2m
                feelsLike.textContent = b.current.apparent_temperature
                wind.textContent = b.current.wind_speed_10m
                humidity.textContent = b.current.relative_humidity_2m

                load.style.display = "none";

            }).catch(function (err) {
                console.log(err);
                error.textContent = "Unable to fetch weather data"
                error.style.display = "block"
                load.style.display = "none";
            })
        })

})
 