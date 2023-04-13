import React, { useState } from 'react';
import SavePerson from './components/SavePerson';
import './app.css'

const App = () => {
  const [people, setPeople] = useState([]);

  const handleCreatePersonClick = () => {
    setPeople([...people, <SavePerson key={people.length} />]);
  };

  const handleResetClick = async () => {
    await fetch('/reset', {
      method: 'POST',
    });
    setPeople([]);
  };

  return (
    <div className="challenge">
      <button 
      className="challenge-create-person-button"
      data-test="challenge-create-person-button"
      onClick={handleCreatePersonClick}
      >
        Create person
      </button>
      <button 
      className="challenge-reset-button"
      data-test="challenge-reset-button" 
      onClick={handleResetClick}>
        Reset
      </button>
      {people.map((person) => person)}
    </div>
  );
};

export default App;
