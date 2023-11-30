import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import Parser from 'coordinate-parser';

function Coordinates(props) {
  const latRef = useRef(null);
  const lonRef = useRef(null);

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
      .catch((err) =>  {props.setIncoming(false); alert('No pinball machines close by')});
  };

  const handleSubmit = (e) => {
    props.setNear([])
    e.preventDefault();
    const latitude = latRef.current.value;
    const longitude = lonRef.current.value;

    // validate the coordinates before the API is called
    if (!validate(latitude, longitude)) {
      alert('Please enter valid coordinates');
      latRef.current.value = '';
      lonRef.current.value = '';
      return;
    }
    // if the coordinates are good, then we can make the calls
    let position = new Parser(`${latitude} ${longitude}`);
    let la = position.getLatitude();
    let lo = position.getLongitude();

    finder(la, lo);
    latRef.current.value = '';
    lonRef.current.value = '';
    props.setIncoming(!props.incoming);
  };

  // Update the input values when props coordinateschange
  useEffect(() => {
    latRef.current.value = props.latitude || '';
    lonRef.current.value = props.longitude || '';
  }, [props.latitude, props.longitude]);

  return (
    <form data-testid="search-button" onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          name="Latitude"
          placeholder="Latitude"
          ref={latRef}
        />
        <input
          type="text"
          name="Longitude"
          placeholder="Longitude"
          ref={lonRef}
        />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default Coordinates;