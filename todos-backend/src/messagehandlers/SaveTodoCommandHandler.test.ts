import { expect } from 'chai';

import { CommandStatus, SaveTodoCommand, Todo } from 'todos-contract';

import { createSaveTodoCommandHandler } from './SaveTodoCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

function testSaveTodo(
  givenTodos: readonly Todo[],
  whenCommand: SaveTodoCommand,
  thenStatus: CommandStatus,
  thenTodos: readonly Todo[]
) {
  return async () => {
    const todosRepository = new MemoryTodosRepository(givenTodos);
    const saveTodo = createSaveTodoCommandHandler(todosRepository);

    const status = await saveTodo(whenCommand);

    expect(status, 'status').to.deep.equal(thenStatus);
    expect(await todosRepository.load(), 'todos').to.deep.equal(thenTodos);
  };
}

describe('Save todo', () => {
  it(
    'changes todos title.',
    testSaveTodo(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      { id: 1, title: 'Taste TypeScript' },
      { success: true },
      [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ]
    )
  );

  it(
    'trims title.',
    testSaveTodo(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      { id: 1, title: '  Taste TypeScript   ' },
      { success: true },
      [
        { id: 1, title: 'Taste TypeScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ]
    )
  );

  it(
    'destroys todo if title is empty.',
    testSaveTodo(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      { id: 1, title: '  ' },
      { success: true },
      [{ id: 2, title: 'Buy Unicorn', completed: false }]
    )
  );
});
