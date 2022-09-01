import { Todo } from 'todos-contract';

import { Filter } from './Filter';

interface TodosProjection {
  readonly shownTodos: readonly Todo[];
  readonly activeCount: number;
}

export function useTodosProjection(todos: readonly Todo[] = [], filter: Filter = Filter.All): TodosProjection {
  const activeCount = todos.filter((todo) => !todo.completed).length;

  const shownTodos = todos.filter((todo) => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return { shownTodos, activeCount };
}
