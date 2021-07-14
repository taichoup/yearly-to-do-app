import './App.css';
import React, { useState, Dispatch, SetStateAction } from 'react';

interface YearlyToDo {
  displayName: string;
  done: boolean;
  dateDone?: string | number | Date;
  doneBy?: string;
}

const toDosExampleSet: YearlyToDo[] = [
  {
    displayName: 'Nettoyer la gouttière',
    done: false,
  },
  {
    displayName: 'Javéliser les WC',
    done: false,
  },
  {
    displayName: 'Nettoyer la VMC',
    done: true,
    dateDone: 1619875991,
    doneBy: 'Christine',
  },
  {
    displayName: "nettoyer la vitre de l'insert",
    done: false,
  },
];

type ToDoItemProps = {
  todo: YearlyToDo;
};

/**
 * This is an item in the list
 */
const ToDoItem = ({ todo }: ToDoItemProps) => {
  const [isDone, setIsDone] = useState(todo.done);

  const handleToDoCheck = (event: React.FormEvent) => {
    if (!todo.done) {
      todo.dateDone = Date.now();
    }
    setIsDone(!isDone);
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={isDone}
        onChange={handleToDoCheck}
      ></input>
      {todo.displayName}
      {isDone && (
        // ?? 0 --> hack
        <span className="date">
          {new Date(todo.dateDone ?? 0).toDateString()}
        </span>
      )}
    </li>
  );
};

type ToDoFormProps = {
  submitHandler: (newTodo: YearlyToDo) => void;
  closeFormHandler: Dispatch<SetStateAction<boolean>>;
};

/**
 * This is the form component to add a new ToDo
 */
const ToDoForm = ({ submitHandler, closeFormHandler }: ToDoFormProps) => {
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
    setDone(event.currentTarget.checked);
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
      <label htmlFor="displayName">Display name</label>
      <input
        type="text"
        onChange={handleDisplayNameChange}
        id="displayName"
        value={displayName}
      />
      <label htmlFor="done">Done?</label>
      <input
        type="checkbox"
        onChange={handleDoneChange}
        id="done"
        checked={done}
      />
      <button type="submit" onClick={handleSubmit}>
        OK
      </button>
    </form>
  );
};

function App() {
  const [yearlyToDos, setYearlyToDos] = useState<YearlyToDo[]>(toDosExampleSet);
  const [addToDoDialogShown, setAddToDoDialogShown] = useState(false);

  const handleAddNewToDo = (event: React.MouseEvent) => {
    setAddToDoDialogShown(true);
  };

  const handleValidateNewToDo = (newToDo: YearlyToDo) => {
    setYearlyToDos(yearlyToDos.concat(newToDo));
  };

  return (
    <div className="App">
      <ul className="main-list">
        {yearlyToDos.map((todo) => (
          <ToDoItem todo={todo} key={todo.displayName} />
        ))}
      </ul>
      <button type="button" onClick={handleAddNewToDo}>
        Add a new task
      </button>
      <div
        className={
          addToDoDialogShown
            ? 'add-todo-dialog-visible'
            : 'add-todo-dialog-hidden'
        }
      >
        <ToDoForm
          submitHandler={handleValidateNewToDo}
          closeFormHandler={setAddToDoDialogShown}
        />
        <button onClick={() => setAddToDoDialogShown(false)}>Close</button>
      </div>
    </div>
  );
}

export default App;
