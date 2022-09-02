import { Todo, TodosRepository } from 'todos-contract';

export class MemoryTodosRepository implements TodosRepository {
  #todos: Todo[];

  constructor(todos: readonly Todo[] = []) {
    this.#todos = [...todos];
  }

  load(): Promise<readonly Todo[]> {
    return Promise.resolve([...this.#todos]);
  }

  store(todos: readonly Todo[]): Promise<void> {
    this.#todos = [...todos];
    return Promise.resolve();
  }
}
