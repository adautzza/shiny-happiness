import logo from './logo.svg';
import './App.css';
import ToDo from './components/ToDo';

function App() {
  return (
    <>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
    <div className="ToDo-modal">
      <h1>Here's my to-do!</h1>
      <ToDo text = "Get a job"></ToDo>
    </div>
    </>
  );
}

export default App;
