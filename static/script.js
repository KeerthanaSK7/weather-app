async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    const weatherContainer = document.getElementById('weatherContainer');
    
    error.style.display = 'none';
    weatherContainer.style.display = 'none';
    
    if (!city) {
        error.textContent = 'Please enter a city name';
        error.style.display = 'block';
        return;
    }
    
    loading.style.display = 'block';
    
    try {
        const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Failed to fetch weather');
        }
        
        document.getElementById('cityName').textContent = data.city;
        document.getElementById('country').textContent = data.country;
        document.getElementById('temperature').textContent = `${Math.round(data.temperature)}°C`;
        document.getElementById('description').textContent = data.description;
        document.getElementById('feelsLike').textContent = `${Math.round(data.feels_like)}°C`;
        document.getElementById('humidity').textContent = `${data.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind_speed} m/s`;
        document.getElementById('pressure').textContent = `${data.pressure} hPa`;
        document.getElementById('clouds').textContent = `${data.clouds}%`;
        
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;
        
        weatherContainer.style.display = 'block';
    } catch (err) {
        error.textContent = `Error: ${err.message}`;
        error.style.display = 'block';
    } finally {
        loading.style.display = 'none';
    }
}

document.getElementById('cityInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') getWeather();
});