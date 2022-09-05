import { Todo } from '../data/Todo';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectTodosQuery {}

export interface SelectTodosQueryResult {
  readonly todos: readonly Todo[];
}

export type SelectTodosQueryHandler = (query: SelectTodosQuery) => Promise<SelectTodosQueryResult>;
