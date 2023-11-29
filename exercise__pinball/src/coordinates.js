import React, { useRef, useEffect } from 'react';

function Coordinates(props) {
  const latRef = useRef(props.latitude);
  const lonRef = useRef(props.longitude);

  useEffect(() => {

  }, [latRef, lonRef])

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('here');
    // console.log(checkCoords(lonRef.current.value))
  }

  // const checkCoords = (input) => {
  //   return Number.isNaN(parseInt(input)) ?  false :  true
  // }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="text" name="Latitude" placeholder="Latitude" ref={latRef} defaultValue={props.latitude} />
        <input type="text" name="Longitude" placeholder="Longitude" ref={lonRef} defaultValue={props.longitude} />
      </label>
      <input type="submit" value="Search" />
    </form>
  );
}

export default Coordinates;
