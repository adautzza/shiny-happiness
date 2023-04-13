import React, { useState, useEffect } from 'react';
import './SavePerson.css'

const SavePerson = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(true);
  const [pendingName, setPendingName] = useState('');
  const [createClicked, setCreateClicked] = useState(false);

  const handleSaveNameClick = () => {
    setName(pendingName);
    setEditing(false);
    setCreateClicked(true);
  };

  const handleEditNameClick = () => {
    setPendingName(name);
    setEditing(true);
  };

  const handleNameChange = (event) => {
    setPendingName(event.target.value);
  };

  useEffect(() => {
    async function addOrUpdatePerson() {
      if (id === '') {
        const response = await fetch('/persons', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: pendingName }),
        });
        const data = await response.json();
        setId(data.id);
        setName(data.name);
      } else {
        const response = await fetch('/persons', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id, name: pendingName }),
        });
        const data = await response.json();
        setName(data.name);
      }
    }

    if (!editing && pendingName !== '') {
      addOrUpdatePerson();
    }
  }, [editing, pendingName, id]);

  if (editing) {
    return (
      <div
      className="challenge-person"
      data-test="challenge-person"
      data-test-person-id={id}
      data-test-person-name={name}
      >
        <br />
        <input
          className="challenge-person-name"
          data-test="challenge-person-name"
          value={pendingName}
          onChange={handleNameChange}
        />
        <button
          className="challenge-person-save-name-button"
          data-test="challenge-person-save-name-button"
          onClick={handleSaveNameClick}
          disabled={!pendingName}
        >
          Save Name
        </button>
      </div>
    );
  } else {
    return (
      <div
      className="challenge-edit-person"
      data-test="challenge-edit-person"
      data-test-person-id={id}
      data-test-person-name={name}
      >
        <div className="edited-name-and-id">
        <div className="edited-name-and-id-name">
        {name} 
        </div>
        <div className="edited-name-and-id-id">
        ({id})
        </div>
        </div>
        <button
          className= { id == ''  ? "challenge-person-edit-name-button disabled" : "challenge-person-edit-name-button"} 
          data-test="challenge-person-edit-name-button"
          onClick={handleEditNameClick}
          disabled={id == ''}
        >
          Edit Name
        </button>
      </div>
    );
  }
};

export default SavePerson;
