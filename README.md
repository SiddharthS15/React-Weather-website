# SkyWeather App

A modern weather application that shows real-time weather data for any city worldwide.

## 🌟 Features
- **City Search** - Search weather by city name
- **Dark/Light Mode** - Toggle between themes
- **Real-time Data** - Temperature, humidity, rainfall, wind speed
- **Weather Icons** - Dynamic weather condition icons
- **Responsive Design** - Works on all devices
- **Smooth Animations** - Modern UI with loading spinners
- **Multi-page Navigation** - Home, About, Contact pages

## 🚀 Live Demo
Deployed on Vercel: [Your App URL]

## ⚙️ Setup for Development

1. Clone the repository
2. Copy `config.example.js` to `config.js`
3. Replace `YOUR_OPENWEATHER_API_KEY_HERE` with your actual API key
4. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
5. Open `index.html` in your browser

**For Vercel Deployment:**
Set environment variable `API_KEY` with your OpenWeatherMap API key.

## 📱 Pages
- **Home** (`index.html`) - Main weather search functionality
- **About** (`about.html`) - App information and usage guide  
- **Contact** (`contact.html`) - Links and resources

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
