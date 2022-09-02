import { expect } from 'chai';

import { createDestroyTodoCommandHandler } from './DestroyTodoCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

describe('Destroy todo', () => {
  it('destroys a todo.', async () => {
    const todosRepository = new MemoryTodosRepository([
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy Unicorn', completed: false },
    ]);
    const destroyTodo = createDestroyTodoCommandHandler(todosRepository);

    const status = await destroyTodo({ id: 2 });

    expect(status).to.deep.equal({ success: true });
    expect(await todosRepository.load()).to.deep.equal([{ id: 1, title: 'Taste JavaScript', completed: true }]);
  });
});
