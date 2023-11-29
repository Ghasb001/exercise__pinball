import React from "react";
import SingleLocation from './singleLocation.js'

function Locations(props) {

  return (
    <div style={{paddingBottom: 10}}>
      {props.locations.length > 0 ?
        props.locations.map((l) => (
          <SingleLocation name={l.name} street={l.street}
            city={l.city} state={l.state} zip={l.zip} website={l.website}
            key={l.id} />
        ))
        :
        null
      }
    </div>
  )
}

export default Locations;
