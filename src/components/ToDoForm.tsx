import './App.css';
import React, { useState, Dispatch, SetStateAction } from 'react';
import { YearlyToDo } from './App';

type ToDoFormProps = {
  submitHandler: (newTodo: YearlyToDo) => void;
  closeFormHandler: Dispatch<SetStateAction<boolean>>;
};

/**
 * This is the form component to add a new ToDo
 */
export const ToDoForm = ({
  submitHandler,
  closeFormHandler,
}: ToDoFormProps) => {
  const [displayName, setDisplayName] = useState('');
  const [done, setDone] = useState(false);
  const [dateDone, setDateDone] = useState();

  const handleDisplayNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setDisplayName(event.currentTarget.value);
  };

  const handleDoneChange = (event: React.FormEvent<HTMLInputElement>): void => {
    // true if checked, false if unchecked
    if (event.currentTarget.value === 'yes') {
        setDone(true);
    } else {
        setDone(false);
    }
  };

  const clearState = () => {
    setDisplayName('');
    setDone(false);
    setDateDone(undefined);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const newTodo: YearlyToDo = {
      displayName,
      done,
      dateDone: Date.now(),
      doneBy: 'Manu',
    };
    submitHandler(newTodo);
    closeFormHandler(false);
    clearState();
  };

  return (
    <form className="add-todo-form">
      <label htmlFor="displayName">Description de la tâche récurrente :</label>
      <input
        type="text"
        onChange={handleDisplayNameChange}
        id="displayName"
        value={displayName}
        autoFocus
      />
      <label htmlFor="done">Est-ce que c&apos;est déjà fait ?</label>
      {/* <input
        type="checkbox"
        onChange={handleDoneChange}
        id="done"
        checked={done}
      /> */}
      <label><input type="radio" value="no" checked={!done} onChange={handleDoneChange}/>Non</label>
      <label><input type="radio" value="yes" checked={done} onChange={handleDoneChange}/>Oui</label>
      <button type="submit" onClick={handleSubmit}>
        OK
      </button>
    </form>
  );
};
