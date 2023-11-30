import React, { useRef } from 'react';
import axios from 'axios';
import Parser from 'coordinate-parser';

function Coordinates(props) {
  const latRef = useRef(null);
  const lonRef = useRef(null);

  // function to validate the cordinates
  const validate = (lat, lon) => {
    var isValid;
    try {
      isValid = true;
      new Parser(`${lat} ${lon}`);
      return isValid;
    } catch (error) {
      isValid = false;
      return isValid;
    }
  }

  // API calls
  const finder = (lat, lon) => {
    axios.get(`https://pinballmap.com/api/v1/regions/closest_by_lat_lon.json?lat=${lat}&lon=${lon}`)
      .then((by) => {
        let name = by.data.region.name;
        axios.get(`https://pinballmap.com/api/v1/region/${name}/locations.json`)
          .then((locs) => {
            props.setNear(locs.data.locations);
          })
          .catch((err) => alert('Something went wrong'));
      })
      .catch((err) => alert('No pinball machines close by'));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const latitude = latRef.current.value;
    const longitude = lonRef.current.value;

    // lat and lon test
    if (!validate(latitude, longitude)) {
      alert('Please enter valid coordinates');
      latRef.current.value = '';
      lonRef.current.value = '';
      return;
    }
    // now we can search
    alert('Searching');
    let position = new Parser(`${latitude} ${longitude}`);
    let la = position.getLatitude(); // 40.123 ✓
    let lo = position.getLongitude(); // -74.123 ✓

    finder(la, lo);
    // reset the ref values
    latRef.current.value = '';
    lonRef.current.value = '';
  };


  return (
    <form data-testid="search-button" onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          name="Latitude"
          placeholder="Latitude"
          ref={latRef}
          defaultValue={props.latitude}
        />
        <input
          type="text"
          name="Longitude"
          placeholder="Longitude"
          ref={lonRef}
          defaultValue={props.longitude}
        />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default Coordinates;
