import React, { useRef, useEffect } from 'react';

function Coordinates(props) {
  const latRef = useRef(props.latitude);
  const lonRef = useRef(props.longitude);

useEffect(() => {

}, [latRef, lonRef])

const handleSubmit = (e) => {
  e.preventDefault();
  console.log(e.current)
}

  console.log('coordinates', props)
  return (
    <form>
      <label>
        <input type="text" name="Latitude" placeholder="Latitude" ref={latRef}/>
        <input type="text" name="Longitude" placeholder="Longitude" ref={lonRef}/>
      </label>
      <input type="submit" value="Submit" onSubmit={handleSubmit}/>
    </form>
  );
}

export default Coordinates;
