import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import ToDoPage from './pages/ToDoPage';

export default function App() {
  return (
    <>
    <Router>
              <Link to="/">Home</Link>
              <br></br>
              <Link to="/to-do">To-Do!</Link>
        <Routes>
          <Route path="/to-do" element={<ToDoPage />} />
        </Routes>
    </Router>
    </>
  );
}
