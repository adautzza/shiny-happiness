import React from "react";
import "./index.css";

const Movie = (props) => {
  return (
    <li>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
    </li>
  );
};

export default Movie;
