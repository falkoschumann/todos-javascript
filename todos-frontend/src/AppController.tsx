import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
  AddTodoCommand,
  AddTodoCommandHandler,
  ClearCompletedCommand,
  ClearCompletedCommandHandler,
  DestroyTodoCommand,
  DestroyTodoCommandHandler,
  SaveTodoCommand,
  SaveTodoCommandHandler,
  SelectTodosQueryHandler,
  SelectTodosQueryResult,
  ToggleAllCommand,
  ToggleAllCommandHandler,
  ToggleTodoCommand,
  ToggleTodoCommandHandler,
} from 'todos-contract';

import { TodosController } from './TodosController';

type AppControllerProps = Readonly<{
  addTodoCommandHandler: AddTodoCommandHandler;
  clearCompletedCommandHandler: ClearCompletedCommandHandler;
  destroyTodoCommandHandler: DestroyTodoCommandHandler;
  saveTodoCommandHandler: SaveTodoCommandHandler;
  toggleAllCommandHandler: ToggleAllCommandHandler;
  toggleTodoCommandHandler: ToggleTodoCommandHandler;
  selectTodosQueryHandler: SelectTodosQueryHandler;
}>;

export function AppController({
  addTodoCommandHandler,
  clearCompletedCommandHandler,
  destroyTodoCommandHandler,
  saveTodoCommandHandler,
  toggleAllCommandHandler,
  toggleTodoCommandHandler,
  selectTodosQueryHandler,
}: AppControllerProps) {
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

  async function handleSaveTodo(command: SaveTodoCommand) {
    await saveTodoCommandHandler(command);
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleToggleAll(command: ToggleAllCommand) {
    await toggleAllCommandHandler(command);
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
  }, [selectTodosQueryHandler]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <TodosController
              selectedTodos={selectedTodos}
              onAddTodo={handleAddTodo}
              onClearCompleted={handleClearCompleted}
              onDestroyTodo={handleDestroyTodo}
              onSaveTodo={handleSaveTodo}
              onToggleAll={handleToggleAll}
              onToggleTodo={handleToggleTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
