import './App.css';
import ToDo from './components/ToDo';

function App() {
  return (
    <>
    <div className="todo-modal">
      <h1>Here's my to-do!</h1>
      <ToDo text="Get a job!"></ToDo>
      <div className="separator"></div>
      <ToDo text="Go to interview on Wednesday!"></ToDo>
    </div>
    </>
  );
}

export default App;
