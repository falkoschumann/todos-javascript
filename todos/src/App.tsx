import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import {
  AddTodoCommand,
  ClearCompletedCommand,
  DestroyTodoCommand,
  SelectTodosQueryResult,
  ToggleTodoCommand,
} from 'todos-contract';
import {
  createAddTodoCommandHandler,
  createClearCompletedCommandHandler,
  createDestroyTodoCommandHandler,
  createSelectTodosQueryHandler,
  createToggleTodoCommandHandler,
  StorageTodosRepository,
} from 'todos-backend';
import { TodosController } from 'todos-frontend';

import './app.css';

const todosRepository = new StorageTodosRepository();
const addTodoCommandHandler = createAddTodoCommandHandler(todosRepository);
const clearCompletedCommandHandler = createClearCompletedCommandHandler(todosRepository);
const destroyTodoCommandHandler = createDestroyTodoCommandHandler(todosRepository);
const toggleTodoCommandHandler = createToggleTodoCommandHandler(todosRepository);
const selectTodosQueryHandler = createSelectTodosQueryHandler(todosRepository);

export function App() {
  const [selectedTodos, setSelectedTodos] = useState<SelectTodosQueryResult>();

  async function handleAddTodo(command: AddTodoCommand) {
    await addTodoCommandHandler(command);
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleClearCompleted(command: ClearCompletedCommand) {
    await clearCompletedCommandHandler(command);
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleDestroyTodo(command: DestroyTodoCommand) {
    await destroyTodoCommandHandler(command);
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleToggleTodo(command: ToggleTodoCommand) {
    await toggleTodoCommandHandler(command);
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  useEffect(() => {
    (async () => {
      const result = await selectTodosQueryHandler({});
      setSelectedTodos(result);
    })();
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <TodosController
            selectedTodos={selectedTodos}
            addTodo={handleAddTodo}
            clearCompleted={handleClearCompleted}
            destroyTodo={handleDestroyTodo}
            toggleTodo={handleToggleTodo}
          />
        }
      />
    </Routes>
  );
}
