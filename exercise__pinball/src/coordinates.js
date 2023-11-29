import React, { useRef, useEffect } from 'react';
import axios from 'axios';

function Coordinates(props) {
  const latRef = useRef(props.latitude);
  const lonRef = useRef(props.longitude);

    // queries to find the name of the region I'm in, then finds the machines in that location
  const finder = (lat, lon) => {
    axios.get(`https://pinballmap.com/api/v1/regions/closest_by_lat_lon.json?lat=${lat}&lon=${lon}`)
    .then((by) => {
      let name = by.data.region.name;
      axios.get(`https://pinballmap.com/api/v1/region/${name}/locations.json`)
      .then((locs) => {
        props.setNear(locs.data.locations)
      })
      .catch((err) => alert('Something went wrong'))
    })
    .catch((err) => alert("No pinball machines close by"))
  }
  /////////////////////////////////////////////////////////////////////////////

  useEffect(() => {

  }, [latRef, lonRef])

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Searching');
    finder(latRef.current.value, lonRef.current.value);
    // console.log(checkCoords(lonRef.current.value))
  }

  // const checkCoords = (input) => {
  //   return Number.isNaN(parseInt(input)) ?  false :  true
  // }

  return (
    <form data-testid="search-button" onSubmit={handleSubmit}>
      <label>
        <input type="text" name="Latitude" placeholder="Latitude" ref={latRef} defaultValue={props.latitude} />
        <input type="text" name="Longitude" placeholder="Longitude" ref={lonRef} defaultValue={props.longitude} />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default Coordinates;
