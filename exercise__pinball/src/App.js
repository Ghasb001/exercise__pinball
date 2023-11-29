import logo from './pinball.PNG';
import './App.css';
import React, { useState, useEffect } from "react";
import Coordinates from './coordinates.js';
import Locations from './locations.js'

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [near, setNear] = useState([])

  // Get the current location based off the browser allowing locations
  const getLocation = async () => {
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
  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

  }, [latitude, longitude])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{padding: 20}}/>
        Enter Coordinates
        <Coordinates latitude={latitude} longitude={longitude} near={near} setNear={setNear}/>
        ----------------------
        <button onClick={() => {
          getLocation()
            .then(({ latitude, longitude }) => {
              setLatitude(latitude);
              setLongitude(longitude);
            })
            .catch(err => alert('Something went wrong'));
        }}>Near Me</button>
        <Locations locations={near}/>
      </header>
    </div>
  );
}

export default App;