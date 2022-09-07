import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppController } from 'todos-frontend';

import './index.css';
import {
  createAddTodoCommandHandler,
  createClearCompletedCommandHandler,
  createDestroyTodoCommandHandler,
  createSaveTodoCommandHandler,
  createSelectTodosQueryHandler,
  createToggleAllCommandHandler,
  createToggleTodoCommandHandler,
} from './BackendProxy';

const addTodoCommandHandler = createAddTodoCommandHandler();
const clearCompletedCommandHandler = createClearCompletedCommandHandler();
const destroyTodoCommandHandler = createDestroyTodoCommandHandler();
const saveTodoCommandHandler = createSaveTodoCommandHandler();
const toggleAllCommandHandler = createToggleAllCommandHandler();
const toggleTodoCommandHandler = createToggleTodoCommandHandler();
const selectTodosQueryHandler = createSelectTodosQueryHandler();

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
