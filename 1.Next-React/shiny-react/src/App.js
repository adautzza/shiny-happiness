import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { BalanceCheckPage, StarWarsPage, ToDoPage } from "./pages";

export default function App() {
  return (
    <>
      <Router>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/to-do">To-Do</Link>
        <br></br>
        <Link to="/balance">About the money</Link>
        <br></br>
        <Link to="/star-wars">Playing Star Wars</Link>
        <Routes>
          <Route path="/" element={<BalanceCheckPage />} />
          <Route path="/to-do" element={<ToDoPage />} />
          <Route path="/balance" element={<BalanceCheckPage />} />
          <Route path="/star-wars" element={<StarWarsPage />} />
        </Routes>
      </Router>
    </>
  );
}
