
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

// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
    const aboutModal = document.getElementById('aboutModal');
    const aboutLink = document.querySelector('a[href="#about"]');
    const closeModal = document.getElementById('closeModal');
    
    // Open modal when About is clicked
    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        aboutModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
    
    // Close modal when X is clicked
    closeModal.addEventListener('click', () => {
        aboutModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutModal.style.display === 'block') {
            aboutModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

document.getElementById('searchBtn').addEventListener('click', () => {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        showError('Please enter a city name.');
        return;
    }
    fetchWeather(city);
});

// Add Enter key support
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('searchBtn').click();
    }
});

function fetchWeather(city) {
    // Show loading spinner
    showLoading();
    
    // Directly get weather data for the city
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                showError('City not found. Please try another city.');
                return;
            }
            
            const temp = data.main.temp;
            const humidity = data.main.humidity;
            const weatherDescription = data.weather[0].description;
            const weatherIcon = data.weather[0].icon;
            const country = data.sys.country;
            const cityName = data.name;
            const feelsLike = data.main.feels_like;
            const windSpeed = data.wind.speed;
            
            let rainfall = 'N/A';
            if (data.rain && data.rain['1h']) {
                rainfall = `${data.rain['1h']} mm (last 1h)`;
            } else if (data.rain && data.rain['3h']) {
                rainfall = `${data.rain['3h']} mm (last 3h)`;
            }
            
            showWeather(cityName, country, temp, humidity, rainfall, weatherDescription, weatherIcon, feelsLike, windSpeed);
        })
        .catch(() => showError('Error fetching weather data. Please try again.'));
}

// Remove the old getWeatherByCity function since we're using direct city search now

function showWeather(cityName, country, temp, humidity, rainfall, weatherDescription, weatherIcon, feelsLike, windSpeed) {
    document.getElementById('weatherContainer').innerHTML = `
        <div class="weather-result">
            <div class="weather-header">
                <img src="https://openweathermap.org/img/wn/${weatherIcon}@2x.png" alt="${weatherDescription}" class="weather-icon-large">
                <div class="weather-info">
                    <h2>${cityName}, ${country}</h2>
                    <p class="weather-desc">${weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1)}</p>
                </div>
            </div>
            <div class="weather-details">
                <div class="weather-item">
                    <span class="weather-label">🌡️ Temperature:</span>
                    <span class="weather-value">${temp}°C</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">🤚 Feels like:</span>
                    <span class="weather-value">${feelsLike}°C</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">💧 Humidity:</span>
                    <span class="weather-value">${humidity}%</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">🌧️ Rainfall:</span>
                    <span class="weather-value">${rainfall}</span>
                </div>
                <div class="weather-item">
                    <span class="weather-label">💨 Wind Speed:</span>
                    <span class="weather-value">${windSpeed} m/s</span>
                </div>
            </div>
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
