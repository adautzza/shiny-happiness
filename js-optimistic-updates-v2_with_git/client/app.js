import React, { Component } from 'react';

let id = 0;

const updatePerson = function(persons, updatedPerson) {
    const existingPerson = persons.find(person => person.id === updatedPerson.id);

    if (existingPerson) {
        return persons.map(person => person === existingPerson ? updatedPerson : person);
    } else {
        const newPersons = [...persons, updatedPerson];
        savePerson(updatedPerson);
        return newPersons;
    }
};

const savePerson = async function(person) {
    const isCreate = person.id < 0;

    const method = isCreate
        ? 'POST'
        : 'PATCH';

    const response = await fetch('/persons', {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
    });

    const result = await response.json();

    console.log('Person saved:', result);
};

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            persons: [],
        };
    }

    onClickCreatePerson = () => {
        const person = {
            name: '',
            id: --id,
        };

        this.setState(state => ({
            persons: updatePerson(state.persons, person),
        }));
    }

    onClickSaveName = (person) => {
        if (person.name.trim() === '') {
            return; 
        }
        const updatedPersons = updatePerson(this.state.persons, person);
        this.setState({ persons: updatedPersons }, () => {
            savePerson(person);
        });
    }

    onChangeName = (person, event) => {
        const name = event.target.value;

        const updatedPerson = {
            ...person,
            name,
        };

        this.setState(state => ({
            persons: updatePerson(state.persons, updatedPerson),
        }));
    }

    renderPersons() {
        return this.state.persons.map(person => (
            <div
                key={person.id}
                className="challenge-person"
                data-test="challenge-person"
                data-test-person-id={person.id}
                data-test-person-name={person.name}
            >
                <input
                    value={person.name}
                    className="challenge-person-name"
                    onChange={event => this.onChangeName(person, event)}
                    data-test="challenge-person-name"
                />
                <button
                    className="challenge-person-save-name-button"
                    onClick={() => this.onClickSaveName(person)}
                    data-test="challenge-person-save-name-button"
                >
                    Save Name
                </button>
            </div>
        ));
    }

    render() {
        return (
            <div className="challenge">
                <button
                    className="challenge-create-person-button"
                    onClick={this.onClickCreatePerson}
                    data-test="challenge-create-person-button"
                >
                    Create Person
                </button>
                <div className="challenge-persons">
                    {this.renderPersons()}
                </div>
            </div>
        );
    }
}
