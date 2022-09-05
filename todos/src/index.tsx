import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createAddTodoCommandHandler,
  createClearCompletedCommandHandler,
  createDestroyTodoCommandHandler,
  createSaveTodoCommandHandler,
  createSelectTodosQueryHandler,
  createToggleAllCommandHandler,
  createToggleTodoCommandHandler,
  StorageTodosRepository,
} from 'todos-backend';
import { AppController } from 'todos-frontend';

import './index.css';

const todosRepository = new StorageTodosRepository();
const addTodoCommandHandler = createAddTodoCommandHandler(todosRepository);
const clearCompletedCommandHandler = createClearCompletedCommandHandler(todosRepository);
const destroyTodoCommandHandler = createDestroyTodoCommandHandler(todosRepository);
const saveTodoCommandHandler = createSaveTodoCommandHandler(todosRepository);
const toggleAllCommandHandler = createToggleAllCommandHandler(todosRepository);
const toggleTodoCommandHandler = createToggleTodoCommandHandler(todosRepository);
const selectTodosQueryHandler = createSelectTodosQueryHandler(todosRepository);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <AppController
      addTodoCommandHandler={addTodoCommandHandler}
      clearCompletedCommandHandler={clearCompletedCommandHandler}
      destroyTodoCommandHandler={destroyTodoCommandHandler}
      saveTodoCommandHandler={saveTodoCommandHandler}
      toggleAllCommandHandler={toggleAllCommandHandler}
      toggleTodoCommandHandler={toggleTodoCommandHandler}
      selectTodosQueryHandler={selectTodosQueryHandler}
    />
  </React.StrictMode>
);
