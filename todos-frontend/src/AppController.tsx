import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import {
  AddTodoCommand,
  ClearCompletedCommand,
  DestroyTodoCommand,
  SelectTodosQueryResult,
  ToggleAllCommand,
  ToggleTodoCommand,
} from 'todos-contract';

import { TodosController } from './TodosController';

type AppControllerProps = Readonly<{
  selectedTodos?: SelectTodosQueryResult;
  addTodo(command: AddTodoCommand): void;
  clearCompleted(command: ClearCompletedCommand): void;
  destroyTodo(command: DestroyTodoCommand): void;
  toggleAll(command: ToggleAllCommand): void;
  toggleTodo(command: ToggleTodoCommand): void;
}>;

export function AppController({
  selectedTodos,
  addTodo,
  clearCompleted,
  destroyTodo,
  toggleAll,
  toggleTodo,
}: AppControllerProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <TodosController
              selectedTodos={selectedTodos}
              addTodo={addTodo}
              clearCompleted={clearCompleted}
              destroyTodo={destroyTodo}
              toggleAll={toggleAll}
              toggleTodo={toggleTodo}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
