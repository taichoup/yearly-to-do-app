import React, { useState } from 'react';
import { YearlyToDo } from './App';

type ToDoItemProps = {
  todo: YearlyToDo;
};

/**
 * This is an item in the list
 */
export const ToDoItem = ({ todo }: ToDoItemProps) => {
  const [isDone, setIsDone] = useState(todo.done);

  const handleToDoCheck = (event: React.FormEvent) => {
    // even if we're undoing a task, it's OK to update the date. It will be overwritten anyway when we recheck.
    todo.dateDone = Date.now();
    setIsDone(!isDone);
  };
  return (
    <li>
      <label className="label">
        <input
          type="checkbox"
          checked={isDone}
          onChange={handleToDoCheck}
        ></input>
        {todo.displayName}
      </label>
      {isDone && (
        // ?? 0 --> hack
        <span className="date">
          {new Date(todo.dateDone ?? 0).toDateString()}
        </span>
      )}
    </li>
  );
};
