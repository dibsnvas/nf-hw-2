import React, { useState } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import { MdOutlineDone } from 'react-icons/md';
import TodoForm from './TodoForm';
import './Todo.css';

const TaskItem = ({ todo, completeTodo, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState({
    id: null,
    value: ''
  });

  const submitUpdate = (value) => {
    updateTodo(edit.id, value);
    setEdit({
      id: null,
      value: ''
    });
  };

  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  return (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'}>
      <div key={todo.id} onClick={() => completeTodo(todo.id)} className="todo-text">
        {todo.text}
      </div>
      <div className="icons">
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
        <MdOutlineDone
          onClick={() => completeTodo(todo.id)}
          className="complete-icon"
        />
      </div>
    </div>
  );
};

export default TaskItem;
