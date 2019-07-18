import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Filter from './components/Filter'
import Person from './components/Person'
import Footer from './components/Footer'
import Notification from './components/Notification'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import './components/styles/styles.css'
import PersonService from './components/services/persons'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [message, setMessage] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('use effect here')
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])
    
  const addForm = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber, 
      id: persons.length + 1
      //id: persons.length + 1
    };
    const found = persons.find(person => person.name === personObject.name)
    if (found !== undefined) {
        if (window.confirm(`${newName}'s is already added to phonebook, replace with a new one?`)) {
          update(found.id, personObject)
        }
    } else {
      add(personObject)
    }
    setNewName("");
    setNewNumber("")
  };

  const add = ({ personObject }) => {
    PersonService
      .create(personObject)
      .then(data => {
        setPersons(persons.concat(data))
      })
      .then(data => 
        console.log(data))
      .then(() => {
        setMessage(`Added ${personObject.name}`)
      })
  }

  const update = ({ id, personObject }) => {
    PersonService
      .update(id, personObject)
      .then(returnedPerson => 
        setPersons(persons
          .map(person => person.id !== id 
          ? person
          : returnedPerson)))
      .then(() => 
        console.log('Replaced!')
        )
      .then(() => {
        setMessage(`Updated ${personObject.name}'s number!`)
      })
      .catch(error => {
        setMessage('removed')
        setTimeout(() => {
          setMessage(null)
        }, 5000) 
    })
    }
  const del = ({person}) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      PersonService
        .del(person.id)
        .then(returned =>
          setPersons(persons.filter(p => p.id !== person.id)))
        .then(() => {
          setMessage(`Deleted ${person.name} from phonebook!`)
        })
        .catch(error => {
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
  }}

  const personsToShow = (newFilter) => {
    if (newFilter) {
      const value = persons.filter(person => person.name.includes(newFilter))
      return value
    }
    else {
      return persons
    }
  }

  const Rows = () =>
  persons
      .filter(person =>
        person.name.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map(person => 
        <Person 
      key={person.id}
      person={person} 
      onClick={() => del(person)}
      />);

  const filterChangeHandler = event => {
    console.log(event.target.value);
    setNewFilter(event.target.value);
  };
  const nameChangeHandler = event => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };
  const numberChangeHandler = event => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  return (
    <div>
     <h1> Phonebook </h1>

     <Notification message={message} />
     <Filter 
     newFilter={newFilter} 
     filterChangeHandler={filterChangeHandler}/>
      <h1> Add a New Contact </h1>
      <PersonForm 
      addPerson={addForm} 
      newName={newName} 
      nameChangeHandler={nameChangeHandler}
      newNumber={newNumber}
      numberChangeHandler={numberChangeHandler} />
      <h1>Numbers </h1>
      <Persons  
      persons={personsToShow(newFilter)} 
      setPersons={setPersons} 
      message={message} />
    </div>
  );
};
export default App; 
