
// Replace with your actual OpenWeatherMap API key


document.getElementById('searchBtn').addEventListener('click', () => {
    const country = document.getElementById('countryInput').value.trim();
    if (!country) {
        showError('Please enter a country name.');
        return;
    }
    fetchWeather(country);
});

function fetchWeather(country) {
    // Get the capital city for the country using REST Countries API
    fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`)
        .then(res => res.json())
        .then(data => {
            if (!data || !data[0] || !data[0].capital) {
                showError('Country not found.');
                return;
            }
            const city = data[0].capital[0];
            getWeatherByCity(city, country);
        })
        .catch(() => showError('Error fetching country info.'));
}

function getWeatherByCity(city, country) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},${encodeURIComponent(country)}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                showError('Weather data not found.');
                return;
            }
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            let rainfall = 'N/A';
            if (data.rain && data.rain['1h']) {
                rainfall = `${data.rain['1h']} mm (last 1h)`;
            } else if (data.rain && data.rain['3h']) {
                rainfall = `${data.rain['3h']} mm (last 3h)`;
            }
            showWeather(city, country, temp, humidity, rainfall);
        })
        .catch(() => showError('Error fetching weather data.'));
}

function showWeather(city, country, temp, humidity, rainfall) {
    document.getElementById('weatherContainer').innerHTML = `
        <h2>Weather in ${city}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Rainfall:</strong> ${rainfall}</p>
    `;
}

function showError(msg) {
    document.getElementById('weatherContainer').innerHTML = `<p class="error">${msg}</p>`;
}
