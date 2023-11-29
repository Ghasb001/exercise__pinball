import logo from './pinball.PNG';
import './App.css';
import React, { useState, useEffect } from "react";
import Coordinates from './coordinates.js';
import axios from 'axios';

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const [near, setNear] = useState(null)
  // console.log('near', near)

  // const tester = () => {
  //   axios.get('https://pinballmap.com/api/v1/regions/closest_by_lat_lon.json?lat=27.3457238&lon=-80.3954678')
  //   .then((r) => {
  //     console.log(r.data.region.name)
  //   })
  // }

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

  useEffect(() => {

  }, [latitude, longitude])

  const finder = (lat, lon) => {
    let name;
    axios.get(`https://pinballmap.com/api/v1/regions/closest_by_lat_lon.json?lat=${lat}&lon=${lon}`)
    .then((n) => {
      name = n.data.region.name;
      console.log('name', name)
      axios.get(`https://pinballmap.com/api/v1/region/:${name}/locations.json`)
      .then((l) => {
        console.log('l', l)
      })
      .catch((err) => err.stack)
      // setNear(name);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {return})
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" style={{padding: 20}}/>
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
        <button onClick={(e) => {
          e.preventDefault();
          finder(27.3457238, -80.3954678)}}>tester</button>
      </header>
    </div>
  );
}

export default App;
