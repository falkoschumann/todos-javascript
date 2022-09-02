import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  AddTodoCommand,
  ClearCompletedCommand,
  DestroyTodoCommand,
  SelectTodosQueryResult,
  ToggleTodoCommand,
} from 'todos-contract';

import { Filter } from './Filter';
import { Footer } from './Footer';
import { getTodosProjection } from './TodosProjection';
import { Header } from './Header';
import { TodoItem } from './TodoItem';

type TodosControllerProps = Readonly<{
  selectedTodos?: SelectTodosQueryResult;
  addTodo(command: AddTodoCommand): void;
  clearCompleted(command: ClearCompletedCommand): void;
  destroyTodo(command: DestroyTodoCommand): void;
  toggleTodo(command: ToggleTodoCommand): void;
}>;

export function TodosController({
  selectedTodos,
  addTodo,
  clearCompleted,
  destroyTodo,
  toggleTodo,
}: TodosControllerProps) {
  const filter = useFilter();
  const { existsTodos, shownTodos, activeCount } = getTodosProjection(selectedTodos?.todos, filter);

  function handleAddTodo(title: string) {
    addTodo({ title });
  }

  function handleClearCompleted() {
    clearCompleted({});
  }

  function handleDestroyTodo(id: number) {
    destroyTodo({ id });
  }

  function handleToggleTodo(id: number) {
    toggleTodo({ id });
  }

  return (
    <section className="container mx-auto">
      <Header addTodo={handleAddTodo} />
      {existsTodos && (
        <>
          <main className="p-4 sm:p-6">
            <ul>
              {shownTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  destroy={() => handleDestroyTodo(todo.id)}
                  toggle={() => handleToggleTodo(todo.id)}
                />
              ))}
            </ul>
          </main>
          <Footer activeCount={activeCount} filter={filter} clearCompleted={handleClearCompleted} />
        </>
      )}
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
