
// API key is loaded from config.js
// Make sure to include config.js before this script in your HTML

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
        themeSwitch.checked = true;
    }
    
    // Theme toggle event listener
    themeSwitch.addEventListener('change', () => {
        if (themeSwitch.checked) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    });
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const country = document.getElementById('countryInput').value.trim();
    if (!country) {
        showError('Please enter a country name.');
        return;
    }
    fetchWeather(country);
});

function fetchWeather(country) {
    // Show loading spinner
    showLoading();
    
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
        <div class="weather-result">
            <h2>Weather in ${city}, ${country}</h2>
            <p><strong>Temperature:</strong> ${temp} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Rainfall:</strong> ${rainfall}</p>
        </div>
    `;
}

function showError(msg) {
    const container = document.getElementById('weatherContainer');
    container.innerHTML = `<p class="error">${msg}</p>`;
    container.classList.add('shake');
    setTimeout(() => container.classList.remove('shake'), 500);
}

function showLoading() {
    document.getElementById('weatherContainer').innerHTML = `
        <div class="loading-spinner"></div>
        <p>Loading weather data...</p>
    `;
}
