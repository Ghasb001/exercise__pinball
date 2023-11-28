import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import Coordinates from './coordinates.js';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => {
          reject(error);
        }
      );
    });
  };

  useEffect(() => {

  }, [latitude, longitude])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        Enter Coordinates
        <Coordinates latitude={latitude} longitude={longitude} />
        ----------------------
        <button onClick={() => {
          getLocation()
            .then(({ latitude, longitude }) => {
              setLatitude(latitude);
              setLongitude(longitude);
            })
            .catch(error => {
              console.error('Location Error', error);
            });
        }}>Near Me</button>
      </header>
    </div>
  );
}

export default App;
