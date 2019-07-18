import React from 'react';
import Person from './Person';

const Persons = ({persons, setPersons, message}) => {

    const contacts = () => persons.map(person => 
                <Person 
                key={person.name} 
                person={person} 
                persons={persons} 
                setPersons={setPersons}
                message={message}/>
            )
    return(
        <div>
            <p>{contacts()}</p>
        </div>
    )
}
export default Persons