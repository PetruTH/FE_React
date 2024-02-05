import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { firestore } from '../firebase';
import { Link } from 'react-router-dom';
import WeatherEntry from './WheatherEntryComponent';
import { collection, addDoc, getDocs, deleteDoc } from "firebase/firestore";
import { incrementButtonPress } from '../actions/buttonActions'; 

const API_KEY = '5a8c5ecedc1bd3a010fe33a35a989bb6';

function Weather({ buttonPressCount, incrementButtonPress }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [lastThreeWeather, setLastThreeWeather] = useState(() => {
    const storedData = localStorage.getItem('lastThreeWeather');
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem('lastThreeWeather', JSON.stringify(lastThreeWeather));
  }, [lastThreeWeather]);

  const handleCityChange = async (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city) {
      return setError('Please enter a city');
    }

    try {
      setError('');
      setLoading(true);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();

      setLastThreeWeather((prevWeather) => [...prevWeather, data].slice(-3));
      localStorage.setItem("temperature", (data.main.temp - 273.15).toFixed(2));

      setWeatherData(data);

      incrementButtonPress();
      
      try {
          const querySnapshot = await getDocs(collection(firestore, "test"));
          querySnapshot.forEach(async (doc) => {
              await deleteDoc(doc.ref);
          });
      } catch (error) {
          console.error("Error deleting documents: ", error);
      }

    } catch (error) {
      console.error(error);
      setError('Failed to fetch weather data');
    }

    setLoading(false);
  };

  return (
    <Card className="mt-4" style = {{backgroundColor:"#727272"}}>
      <Card.Body className='d-flex flex-column align-items-center justify-content-center'>
        <h2 className="text-center mb-4">Weather</h2>

        <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center justify-content-center mb-3'>
          <Form.Group controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={handleCityChange}
            />
          </Form.Group>

          <Button
            className="mb-3 mt-3 w-100"
            type="submit"
            disabled={loading}
            style = {{
              backgroundColor: "#884ABF",
              borderColor: '#884ABF',
              color: "black"
            }}
          >
            {loading ? 'Getting Weather...' : 'Get Weather'}
          </Button>
        </Form>
        
        {loading && <Alert variant="info">Loading...</Alert>}
        {weatherData && (
          <>
            <h3 className="mb-3">Weather in {weatherData.name}</h3>
            <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
            <p>Weather: {weatherData.weather[0].description}</p>
          </>
        )}
        {error && <Alert variant="danger">{error}</Alert>}
        <Link to="/" className="btn btn-primary w-100 mt-3 mb-3" style={{ backgroundColor: '#884ABF', borderColor: '#884ABF', color: "black" }}>
          Back to dashboard
        </Link>

        <div className="last-three-weather">
          <h3>Last Three Weather Entries</h3>
          {lastThreeWeather.map((entry, index) => (
            <WeatherEntry key={index} entry={entry} />
          ))}
        </div>

        <div className="mt-3">
          <p>
            <strong>Button Press Count:</strong> {buttonPressCount}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
       
}

const mapStateToProps = (state) => ({
  buttonPressCount: state.button.buttonPressCount, 
});

const mapDispatchToProps = (dispatch) => ({
  incrementButtonPress: () => dispatch(incrementButtonPress()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
