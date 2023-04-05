import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { MovieList } from "./components/swapi";
import { BalanceCheckPage, ToDoPage } from "./pages";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [planets, setPlanets] = useState([]);

  const fetchMovie = () => {
    return fetch("https://swapi.dev/api/films/?format=json")
      .then((response) => response.json())
      .then((data) => {
        const transoformedMovies = data.results.map((movieData) => {
          return {
            id: movieData.episode_id,
            title: movieData.title,
            openingText: movieData.opening_crawl,
            releaseDate: movieData.releaseDate,
          };
        });
        setMovies(transoformedMovies);
        console.log(data.results);
      });
  };

  const fetchPlanets = () => {
    return fetch("https://swapi.dev/api/planets/?format=json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
        setPlanets(data.results);
      });
  };

  const handlePlanetMaxWater = () => {
    fetchPlanets().then(() => {
      const maxWater = planets.reduce(
        (prev, current) => {
          return prev.surface_water > current.surface_water ? prev : current;
        },
        { surface_water: 0 }
      );

      const maxWaterPlanets = planets.filter((planet) => {
        return planet.surface_water === maxWater.surface_water;
      });
      console.log("Planets with maximum water:", maxWaterPlanets);
    });
  };

  const filteredPlanets = planets.filter((planet) => {
    return planet.surface_water > 10;
  });

  return (
    <>
      <Router>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/to-do">To-Do</Link>
        <br></br>
        <Link to="/balance">About the money</Link>
        <Routes>
          <Route path="/to-do" element={<ToDoPage />} />
          <Route path="/balance" element={<BalanceCheckPage />} />
        </Routes>
      </Router>
      <div>
        <button onClick={fetchMovie}>Fetch movies</button>
      </div>
      <div>
        <MovieList movies={movies}></MovieList>
      </div>
      <div>
        <button onClick={fetchPlanets}>Fetch planets</button>
      </div>
      <div>
        {filteredPlanets.map((planet) => (
          <>
            <div>{planet.name}</div>
            <div>{planet.surface_water}</div>
          </>
        ))}
      </div>
      <div>
        <button onClick={handlePlanetMaxWater}>Fetch planets with max waters</button>
      </div>
    </>
  );
}
