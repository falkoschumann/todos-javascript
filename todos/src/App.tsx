import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { AddTodoCommand, SelectTodosQueryResult } from 'todos-contract';
import { createAddTodoCommandHandler, createSelectTodosQueryHandler, MemoryTodosRepository } from 'todos-backend';
import { TodosController } from 'todos-frontend';

import './app.css';

const todosRepository = new MemoryTodosRepository([
  //  { id: 1, title: 'Taste JavaScript', completed: true },
  //  { id: 2, title: 'Buy Unicorn', completed: false },
]);
const addTodoCommandHandler = createAddTodoCommandHandler(todosRepository);
const selectTodosQueryHandler = createSelectTodosQueryHandler(todosRepository);

export function App() {
  const [selectedTodos, setSelectedTodos] = useState<SelectTodosQueryResult>();

  async function addTodo(command: AddTodoCommand) {
    await addTodoCommandHandler(command);
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
      <Route path="*" element={<TodosController selectedTodos={selectedTodos} addTodo={addTodo} />} />
    </Routes>
  );
}
