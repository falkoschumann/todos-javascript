import { Todo, TodosRepository } from 'todos-contract';

const STORAGE_KEY = 'todos';

export class StorageTodosRepository implements TodosRepository {
  #storage: Storage;

  constructor(storage: Storage = window.localStorage) {
    this.#storage = storage;
  }

  load(): Promise<readonly Todo[]> {
    const json = this.#storage.getItem(STORAGE_KEY) || '[]';
    const todos = JSON.parse(json);
    return Promise.resolve(todos);
  }

  store(todos: readonly Todo[]): Promise<void> {
    const json = JSON.stringify(todos);
    this.#storage.setItem(STORAGE_KEY, json);
    return Promise.resolve();
  }
}
