import React, { useState, useEffect } from 'react';
import { debouncedFetch } from '../api.js';

const SavePerson = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [editing, setEditing] = useState(true);

  const handleSaveNameClick = () => {
    setEditing(false);
  };

  const handleEditNameClick = () => {
    setEditing(true);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    const addOrUpdatePerson = async () => {
      try {
        if (id === '') {
          const data = await debouncedFetch('/persons', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
          });
          setId(data.id);
        } else {
          const data = await debouncedFetch(`/persons`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, name }),
          });
          setId(data.id);
        }
      } catch (error) {
        console.log('Error in add or update:', error);
      }
    };

    if (!editing && name !== '') {
      addOrUpdatePerson();
    }
  }, [editing, name, id]);

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
          value={name}
          onChange={handleNameChange}
        />
        <button
          className="challenge-person-save-name-button"
          data-test="challenge-person-save-name-button"
          onClick={handleSaveNameClick}
          disabled={!name}
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
        <br />
        {name} ({id})
        <button
          className="challenge-person-edit-name-button"
          data-test="challenge-person-edit-name-button"
          onClick={handleEditNameClick}
        >
          Edit Name
        </button>
      </div>
    );
  }
};

export default SavePerson;
