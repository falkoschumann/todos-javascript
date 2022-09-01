import { Todo } from '../data/Todo';

export interface TodosRepository {
  load(): Promise<readonly Todo[]>;

  store(todos: readonly Todo[]): Promise<void>;
}
