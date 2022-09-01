import React from 'react';
import { useLocation } from 'react-router-dom';

import { SelectTodosQueryResult } from 'todos-contract';

import { Filter } from './Filter';
import { Footer } from './Footer';
import { TodoItem } from './TodoItem';
import { useTodosProjection } from './TodosProjection';

interface TodosControllerProps {
  readonly selectedTodos?: SelectTodosQueryResult;
}

export function TodosController({ selectedTodos }: TodosControllerProps) {
  const filter = useFilter();
  const { shownTodos, activeCount } = useTodosProjection(selectedTodos?.todos, filter);

  return (
    <section className="container mx-auto">
      <header className="p-4 sm:p-6">
        <h1 className="text-5xl font-extrabold text-center dark:text-white">Todos</h1>
      </header>
      <main className="p-4 sm:p-6">
        <ul>
          {shownTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </main>
      <Footer activeCount={activeCount} filter={filter} />
    </section>
  );
}

function useFilter(): Filter {
  const { pathname } = useLocation();
  switch (pathname) {
    case '/active':
      return Filter.Active;
    case '/completed':
      return Filter.Completed;
    default:
      return Filter.All;
  }
}
