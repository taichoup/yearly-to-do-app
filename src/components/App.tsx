import './App.css';
import React, { useState } from 'react';
import { ToDoForm } from './ToDoForm';
import { ToDoItem } from './ToDoItem';

export interface YearlyToDo {
  displayName: string;
  done: boolean;
  dateDone?: string | number | Date;
  doneBy?: string;
  recurrenceStepInYears?: number;
}

const toDosExampleSet: YearlyToDo[] = [
  {
    displayName: 'Nettoyer la gouttière',
    done: false,
    recurrenceStepInYears: 1,
  },
  {
    displayName: 'Javéliser les WC',
    done: false,
  },
  {
    displayName: 'Nettoyer la VMC',
    done: true,
    dateDone: 1621034001000,
    doneBy: 'Christine',
  },
  {
    displayName: "nettoyer la vitre de l'insert",
    done: false,
  },
  {
    displayName: 'nettoyer les poubelles',
    done: false,
  },
  {
    displayName: 'faire tailler la haie (cyprès)',
    done: false,
    recurrenceStepInYears: 5,
  },
  {
    displayName: 'vider le compost',
    done: false,
  },
];

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
      <button
        type="button"
        onClick={handleAddNewToDo}
        className="add-todo-button"
      >
        Ajouter une tâche récurrente
      </button>
      <div className="add-todo-dialog-wrapper">
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
          <button onClick={() => setAddToDoDialogShown(false)}>Annuler</button>
        </div>
      </div>
    </div>
  );
}

export default App;
