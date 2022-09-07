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
    const status = await addTodoCommandHandler(command);
    if (!status.success) {
      console.error('Add todo failed:', status.errorMessage);
    }
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleClearCompleted(command: ClearCompletedCommand) {
    const status = await clearCompletedCommandHandler(command);
    if (!status.success) {
      console.error('Add todo failed:', status.errorMessage);
    }
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleDestroyTodo(command: DestroyTodoCommand) {
    const status = await destroyTodoCommandHandler(command);
    if (!status.success) {
      console.error('Add todo failed:', status.errorMessage);
    }
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleSaveTodo(command: SaveTodoCommand) {
    const status = await saveTodoCommandHandler(command);
    if (!status.success) {
      console.error('Add todo failed:', status.errorMessage);
    }
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleToggleAll(command: ToggleAllCommand) {
    const status = await toggleAllCommandHandler(command);
    if (!status.success) {
      console.error('Add todo failed:', status.errorMessage);
    }
    const result = await selectTodosQueryHandler({});
    setSelectedTodos(result);
  }

  async function handleToggleTodo(command: ToggleTodoCommand) {
    const status = await toggleTodoCommandHandler(command);
    if (!status.success) {
      console.error('Add todo failed:', status.errorMessage);
    }
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
