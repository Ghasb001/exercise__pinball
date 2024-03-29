import React from "react";
import SingleLocation from './singleLocation.js'

function Locations(props) {

  return (
    <div data-testid="locations">
      {props.locations.length > 0 ?
        props.locations.map((l) => (
          <SingleLocation name={l.name} street={l.street}
            city={l.city} state={l.state} zip={l.zip} website={l.website}
            key={l.id} />
        ))
        :
        <div data-testid="nullLoc">{null}</div>
      }
    </div>
  )
}

export default Locations;
