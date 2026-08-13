const apiKey = "2267cc0e17ee4a90915202024262407";

const btn = document.getElementById("btn");
const cityInput = document.getElementById("city");
const message = document.getElementById("message");

btn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

    message.innerText = "Loading...";

    try {

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            message.innerText = "";
            alert(data.error.message);
            return;
        }

        message.innerText = "";

        // City
        document.getElementById("cityName").innerText =
            `${data.location.name}, ${data.location.country}`;

        // Temperature
        document.getElementById("temp").innerText =
            `${Math.round(data.current.temp_c)}°C`;

        // Weather Condition
        document.getElementById("condition").innerText =
            data.current.condition.text;

        // Feels Like
        document.getElementById("feelsLike").innerText =
            `Feels Like: ${Math.round(data.current.feelslike_c)}°C`;

        // Humidity
        document.getElementById("humidity").innerText =
            `${data.current.humidity}%`;

        // Wind
        document.getElementById("wind").innerText =
            `${data.current.wind_kph} km/h`;

        // Visibility
        document.getElementById("visibility").innerText =
            `${data.current.vis_km} km`;

        // Pressure
        document.getElementById("pressure").innerText =
            `${data.current.pressure_mb} mb`;

        /*// ==========================
        // WEATHER ICON
        // ==========================

        const iconUrl = data.current.condition.icon.startsWith("//")
            ? "https:" + data.current.condition.icon
            : data.current.condition.icon;

        console.log("Icon URL:", iconUrl);

        const weatherIcon = document.getElementById("weatherIcon");
        weatherIcon.src = iconUrl;
        weatherIcon.alt = data.current.condition.text;

        weatherIcon.onerror = function () {
            console.log("Icon failed to load:", iconUrl);
        }; */

        // ==========================
        // BACKGROUND
        // ==========================

        changeBackground(
            data.current.condition.text,
            data.current.is_day
        );

    }
    catch (error) {

        console.error(error);
        message.innerText = "";
        alert("Something went wrong. Please try again.");
    }
}

function changeBackground(weather, isDay) {

    const body = document.getElementById("body");

    if (isDay === 0) {
        body.style.backgroundImage = "url('./images/night.jpg')";
        return;
    }

    weather = weather.toLowerCase();

    if (weather.includes("sunny") || weather.includes("clear")) {

        body.style.backgroundImage = "url('./images/sunny.jpg')";

    }
    else if (weather.includes("cloud")) {

        body.style.backgroundImage = "url('./images/cloudy.jpg')";

    }
    else if (
        weather.includes("rain") ||
        weather.includes("drizzle") ||
        weather.includes("thunder")
    ) {

        body.style.backgroundImage = "url('./images/rainy.jpg')";

    }
    else {

        body.style.backgroundImage = "url('./images/bg.jpg')";
    }

}