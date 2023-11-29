import React from "react";

function SingleLocation(props) {
  return (
    <div style={{padding: 10}}>
      <li>
        {props.name} | {props.street} {props.city}, {props.state} {props.zip}
        <a class='App-link' href={props.website} style={{paddingLeft: 5}}>{props.website}</a>
      </li>
    </div>
  )
}

export default SingleLocation;
