import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  AddTodoCommand,
  ClearCompletedCommand,
  DestroyTodoCommand,
  SaveTodoCommand,
  SelectTodosQueryResult,
  TodoId,
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
  onAddTodo(command: AddTodoCommand): void;
  onClearCompleted(command: ClearCompletedCommand): void;
  onDestroyTodo(command: DestroyTodoCommand): void;
  onSaveTodo(command: SaveTodoCommand): void;
  onToggleAll(command: ToggleAllCommand): void;
  onToggleTodo(command: ToggleTodoCommand): void;
}>;

export function TodosController({
  selectedTodos,
  onAddTodo,
  onClearCompleted,
  onDestroyTodo,
  onSaveTodo,
  onToggleAll,
  onToggleTodo,
}: TodosControllerProps) {
  const filter = useFilter();
  const { existsTodos, shownTodos, isAllCompleted, activeCount, existsCompleted } = getTodosProjection(
    selectedTodos?.todos,
    filter
  );
  const [editing, setEditing] = useState<TodoId | null>();

  function handleAddTodo(title: string) {
    onAddTodo({ title });
  }

  function handleClearCompleted() {
    onClearCompleted({});
  }

  function handleCancel() {
    setEditing(null);
  }

  function handleDestroyTodo(id: TodoId) {
    onDestroyTodo({ id });
  }

  function handleEdit(id: TodoId) {
    setEditing(id);
  }

  function handleSaveTodo(id: TodoId, title: string) {
    onSaveTodo({ id, title });
    setEditing(null);
  }

  function handleToggleAll(checked: boolean) {
    onToggleAll({ checked });
  }

  function handleToggleTodo(id: TodoId) {
    onToggleTodo({ id });
  }

  return (
    <section className="max-w-3xl mx-auto">
      <Header
        existsTodos={existsTodos}
        isAllCompleted={isAllCompleted}
        addTodo={handleAddTodo}
        toggleAll={handleToggleAll}
      />
      {existsTodos && (
        <>
          <main className="p-4 sm:p-6">
            <ul>
              {shownTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  editing={editing === todo.id}
                  onCancel={() => handleCancel()}
                  onDestroy={() => handleDestroyTodo(todo.id)}
                  onEdit={() => handleEdit(todo.id)}
                  onSave={(title) => handleSaveTodo(todo.id, title)}
                  onToggle={() => handleToggleTodo(todo.id)}
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
