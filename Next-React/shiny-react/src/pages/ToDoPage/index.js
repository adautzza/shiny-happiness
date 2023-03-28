import React, { Component } from "react";
import "./index.css";
import ToDo from "../../components/ToDoProject/ToDo";

class ToDoPage extends Component {
  render() {
    return (
      <div className="todo-modal">
        <h1>Here's my to-do!</h1>
        <ToDo text="Get a job!"></ToDo>
        <div className="separator"></div>
        <ToDo text="Go to interview on Wednesday!"></ToDo>
      </div>
    );
  }
}

export default ToDoPage;
