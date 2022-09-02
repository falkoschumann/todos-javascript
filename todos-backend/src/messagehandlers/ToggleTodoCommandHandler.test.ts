import { expect } from 'chai';

import { CommandStatus, Todo, ToggleTodoCommand } from 'todos-contract';

import { createToggleTodoCommandHandler } from './ToggleTodoCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

function testToggleTodo(
  givenTodos: readonly Todo[],
  whenCommand: ToggleTodoCommand,
  thenStatus: CommandStatus,
  thenTodos: readonly Todo[]
) {
  return async () => {
    const todosRepository = new MemoryTodosRepository(givenTodos);
    const toggleTodo = createToggleTodoCommandHandler(todosRepository);

    const status = await toggleTodo(whenCommand);

    expect(status).to.deep.equal(thenStatus);
    expect(await todosRepository.load()).to.deep.equal(thenTodos);
  };
}

describe('Toggle todo', () => {
  it(
    'activates a todo.',
    testToggleTodo(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      { id: 1 },
      { success: true },
      [
        { id: 1, title: 'Taste JavaScript', completed: false },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ]
    )
  );

  it(
    'completes a todo.',
    testToggleTodo(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      { id: 2 },
      { success: true },
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: true },
      ]
    )
  );
});
