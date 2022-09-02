import { Todo } from 'todos-contract';

import { Filter } from './Filter';

type TodosProjection = Readonly<{
  existsTodos: boolean;
  shownTodos: readonly Todo[];
  activeCount: number;
}>;

export function getTodosProjection(todos: readonly Todo[] = [], filter: Filter = Filter.All): TodosProjection {
  const existsTodos = todos.length > 0;

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

  return { existsTodos, shownTodos, activeCount };
}
