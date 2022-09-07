import fs from 'fs/promises';

import { Todo, TodosRepository } from 'todos-contract';

export class FileTodosRepository implements TodosRepository {
  readonly #file: string;

  constructor(file: string) {
    this.#file = file;
  }

  async load(): Promise<readonly Todo[]> {
    try {
      await fs.access(this.#file, fs.constants.F_OK);
    } catch {
      return [];
    }

    const json = await fs.readFile(this.#file, 'utf8');
    return JSON.parse(json);
  }

  async store(todos: readonly Todo[]): Promise<void> {
    const json = JSON.stringify(todos);
    await fs.writeFile(this.#file, json);
  }
}
