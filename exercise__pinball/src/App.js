import logo from './pinball.PNG';
import './App.css';
import React, { useState, useEffect } from "react";
import Coordinates from './coordinates.js';
import Locations from './locations.js'

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [near, setNear] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [incoming, setIncoming] = useState(false);

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

  const clickedBool = () => {
    return clicked ?
      (<div className="loading">Locating</div>) :
      (<div>Enter Coordinates</div>)
  }

  useEffect(() => {
    if (near.length > 0) { setIncoming(false) }
  }, [near])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{ padding: 20 }} />
        {clickedBool()}
        <Coordinates
          latitude={latitude}
          longitude={longitude}
          setNear={setNear}
          setIncoming={setIncoming}
        />
        ----------------------
        <button data-testid="near-button" onClick={() => {
          setClicked(true);
          getLocation()
            .then(({ latitude, longitude }) => {
              setLatitude(latitude);
              setLongitude(longitude);
              setClicked(false)
            })
            .catch(err => alert('No locations found'));
        }}>Near Me</button>
        {incoming && near.length === 0 ? <div className="spinning-circle"></div>
          : <Locations locations={near}></Locations>}
      </header>
    </div>
  );
}

export default App;