import { expect } from 'chai';

import { createSelectTodosQueryHandler } from './SelectTodosQueryHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

describe('Select todos', () => {
  it('returns all todos.', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy Unicorn', completed: false },
    ]);
    const selectTodos = createSelectTodosQueryHandler(todosRepository);

    const result = await selectTodos({});

    expect(result, 'result').to.deep.equal({
      todos: [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
    });
  });
});
