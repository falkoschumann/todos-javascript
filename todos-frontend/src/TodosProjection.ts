import { Todo } from 'todos-contract';

import { Filter } from './Filter';

type TodosProjection = Readonly<{
  existsTodos: boolean;
  shownTodos: readonly Todo[];
  isAllCompleted: boolean;
  activeCount: number;
  existsCompleted: boolean;
}>;

export function getTodosProjection(todos: readonly Todo[] = [], filter: Filter = Filter.All): TodosProjection {
  const activeTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);
  const existsTodos = todos.length > 0;
  let shownTodos: readonly Todo[];
  switch (filter) {
    case Filter.Active:
      shownTodos = activeTodos;
      break;
    case Filter.Completed:
      shownTodos = completedTodos;
      break;
    case Filter.All:
    default:
      shownTodos = todos;
      break;
  }
  const activeCount = activeTodos.length;
  const existsCompleted = completedTodos.length > 0;
  const isAllCompleted = todos.length > 0 && todos.length === completedTodos.length;
  return { existsTodos, shownTodos, isAllCompleted, activeCount, existsCompleted };
}
