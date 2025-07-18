# Weather App

A simple weather application that shows temperature, humidity, and rainfall details for any country.

## Features
- Search weather by country name
- Dark/Light mode toggle
- Animated UI with loading spinner
- Responsive design
- Modern navigation bar

## Setup

1. Clone the repository
2. Copy `config.example.js` to `config.js`
3. Add your OpenWeatherMap API key to `config.js`:
   ```javascript
   const CONFIG = {
       API_KEY: 'your_actual_api_key_here'
   };
   ```
4. Open `index.html` in your browser

## API Key

Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)

## Files
- `index.html` - Main HTML file
- `style.css` - Styling and animations
- `script.js` - Main JavaScript functionality
- `config.example.js` - Example configuration file
- `config.js` - Your actual configuration (not included in git)

## Note
Make sure to keep your `config.js` file private and never commit it to version control.
