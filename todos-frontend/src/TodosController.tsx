import React from 'react';
import { useLocation } from 'react-router-dom';

import {
  AddTodoCommand,
  ClearCompletedCommand,
  DestroyTodoCommand,
  SelectTodosQueryResult,
  ToggleAllCommand,
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
  toggleAll(command: ToggleAllCommand): void;
  toggleTodo(command: ToggleTodoCommand): void;
}>;

export function TodosController({
  selectedTodos,
  addTodo,
  clearCompleted,
  destroyTodo,
  toggleAll,
  toggleTodo,
}: TodosControllerProps) {
  const filter = useFilter();
  const { existsTodos, shownTodos, isAllCompleted, activeCount, existsCompleted } = getTodosProjection(
    selectedTodos?.todos,
    filter
  );

  function handleAddTodo(title: string) {
    addTodo({ title });
  }

  function handleClearCompleted() {
    clearCompleted({});
  }

  function handleDestroyTodo(id: number) {
    destroyTodo({ id });
  }

  function handleToggleAll(checked: boolean) {
    toggleAll({ checked });
  }

  function handleToggleTodo(id: number) {
    toggleTodo({ id });
  }

  return (
    <section className="container mx-auto">
      <Header isAllCompleted={isAllCompleted} addTodo={handleAddTodo} toggleAll={handleToggleAll} />
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
          <Footer
            activeCount={activeCount}
            existsCompleted={existsCompleted}
            filter={filter}
            clearCompleted={handleClearCompleted}
          />
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
