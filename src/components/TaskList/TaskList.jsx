import React, { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TaskItem from './TaskItem';
import './Todo.css';

const TaskList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    try {
      const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
      setTodos(storedTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos:", error);
    }
  }, [todos]);

  const addTask = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const completeTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="container">
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTask} />
      <div>
        {todos.map((todo) => (
          <TaskItem
            key={todo.id}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
      {todos.length === 0 && (
        <div className="empty-state">
          <p>Empty...</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
