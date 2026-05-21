from flask import Flask, render_template, request, jsonify
import requests
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
API_KEY = os.getenv('OPENWEATHER_API_KEY', 'YOUR_API_KEY_HERE')
BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/weather', methods=['GET'])
def get_weather():
    city = request.args.get('city')
    
    if not city:
        return jsonify({'error': 'City name required'}), 400
    
    try:
        params = {
            'q': city,
            'appid': API_KEY,
            'units': 'metric'
        }
        
        response = requests.get(BASE_URL, params=params)
        data = response.json()
        
        if response.status_code != 200:
            return jsonify({'error': 'City not found'}), 404
        
        weather_data = {
            'city': data['name'],
            'country': data['sys']['country'],
            'temperature': data['main']['temp'],
            'feels_like': data['main']['feels_like'],
            'humidity': data['main']['humidity'],
            'pressure': data['main']['pressure'],
            'description': data['weather'][0]['description'],
            'icon': data['weather'][0]['icon'],
            'wind_speed': data['wind']['speed'],
            'clouds': data['clouds']['all']
        }
        
        return jsonify(weather_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)