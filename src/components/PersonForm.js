import React, { useState, useEffect } from "react";
  const PersonForm = ({ addPerson, newName, nameChangeHandler, newNumber, numberChangeHandler}) => {
    return (
        <div> 
        <form onSubmit={addPerson}>
        Name: <input 
        value={newName} 
        onChange={nameChangeHandler} />
        Number: <input 
        value={newNumber} 
        onChange={numberChangeHandler} />
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      </div>
    )
}
export default PersonForm