import React from "react";
import "./index.css";
import { Movie } from "..";

const MovieList = (props) => {
  return (
    <React.Fragment>
      <ul className="movies-list">
        {props.movies.map((movie) => (
          <Movie key={movie.id} title={movie.title} releaseDate={movie.releaseDate} openingText={movie.openingText} />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default MovieList;
