import { QueryHandler } from '../MessageHandler';
import { Todo } from '../../data/Todo';

// Query is empty.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SelectTodosQuery {}

export interface SelectTodosQueryResult {
  readonly todos: readonly Todo[];
}

export type SelectTodosQueryHandler = QueryHandler<SelectTodosQuery, SelectTodosQueryResult>;
