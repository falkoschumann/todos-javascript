import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { createSelectTodosQueryHandler, MemoryTodosRepository } from 'todos-backend';
import { SelectTodosQueryResult } from 'todos-contract';
import { TodosController } from 'todos-frontend';

import './app.css';

const todosRepository = new MemoryTodosRepository([
  { id: 1, title: 'Taste JavaScript', completed: true },
  { id: 2, title: 'Buy Unicorn', completed: false },
]);
const selectTodosQueryHandler = createSelectTodosQueryHandler(todosRepository);

export function App() {
  const [selectedTodos, setSelectedTodos] = useState<SelectTodosQueryResult>();

  useEffect(() => {
    (async () => {
      const result = await selectTodosQueryHandler({});
      setSelectedTodos(result);
    })();
  }, []);

  return (
    <Routes>
      <Route path="*" element={<TodosController selectedTodos={selectedTodos} />} />
    </Routes>
  );
}
