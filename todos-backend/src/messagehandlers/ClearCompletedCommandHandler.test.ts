import { expect } from 'chai';

import { createClearCompletedCommandHandler } from './ClearCompletedCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

describe('Clear completed', () => {
  it('removes completed todos.', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy Unicorn', completed: false },
    ]);
    const clearCompleted = createClearCompletedCommandHandler(todosRepository);

    const status = await clearCompleted({});

    expect(status).to.deep.equal({ success: true });
    expect(await todosRepository.load()).to.deep.equal([{ id: 2, title: 'Buy Unicorn', completed: false }]);
  });
});
