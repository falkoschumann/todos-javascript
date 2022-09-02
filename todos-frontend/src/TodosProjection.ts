import { Todo } from 'todos-contract';

import { Filter } from './Filter';

type TodosProjection = Readonly<{
  existsTodos: boolean;
  shownTodos: readonly Todo[];
  activeCount: number;
  existsCompleted: boolean;
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

  const existsCompleted = todos.filter((todo) => todo.completed).length > 0;

  return { existsTodos, shownTodos, activeCount, existsCompleted };
}
