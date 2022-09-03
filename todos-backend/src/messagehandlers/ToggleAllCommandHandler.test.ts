import { expect } from 'chai';

import { CommandStatus, Todo, ToggleAllCommand } from 'todos-contract';

import { createToggleAllCommandHandler } from './ToggleAllCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

function testToggleTodo(
  givenTodos: readonly Todo[],
  whenCommand: ToggleAllCommand,
  thenStatus: CommandStatus,
  thenTodos: readonly Todo[]
) {
  return async () => {
    const todosRepository = new MemoryTodosRepository(givenTodos);
    const toggleAll = createToggleAllCommandHandler(todosRepository);

    const status = await toggleAll(whenCommand);

    expect(status, 'status').to.deep.equal(thenStatus);
    expect(await todosRepository.load(), 'todos').to.deep.equal(thenTodos);
  };
}

describe('Toggle all', () => {
  it(
    'set all todos completed.',
    testToggleTodo(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      { checked: true },
      { success: true },
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: true },
      ]
    )
  );

  it(
    'set all todos active.',
    testToggleTodo(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      { checked: false },
      { success: true },
      [
        { id: 1, title: 'Taste JavaScript', completed: false },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ]
    )
  );
});
