import { expect } from 'chai';

import { AddTodoCommand, CommandStatus, Todo } from 'todos-contract';

import { createAddTodoCommandHandler } from './AddTodoCommandHandler';
import { MemoryTodosRepository } from '../adapters/MemoryTodosRepository';

function testAddTodo(
  givenTodos: readonly Todo[],
  whenCommand: AddTodoCommand,
  thenStatus: CommandStatus,
  thenTodos: readonly Todo[]
) {
  return async () => {
    const todosRepository = new MemoryTodosRepository(givenTodos);
    const addTodo = createAddTodoCommandHandler(todosRepository);

    const status = await addTodo(whenCommand);

    expect(status).to.deep.equal(thenStatus);
    expect(await todosRepository.load()).to.deep.equal(thenTodos);
  };
}

describe('Add todo', () => {
  it(
    'saves first todo.',
    testAddTodo([], { title: 'Taste JavaScript' }, { success: true }, [
      { id: 1, title: 'Taste JavaScript', completed: false },
    ])
  );

  it(
    'saves new todo.',
    testAddTodo([{ id: 1, title: 'Taste JavaScript', completed: true }], { title: 'Buy Unicorn' }, { success: true }, [
      { id: 1, title: 'Taste JavaScript', completed: true },
      { id: 2, title: 'Buy Unicorn', completed: false },
    ])
  );

  it(
    'saves trimmed title.',
    testAddTodo(
      [{ id: 1, title: 'Taste JavaScript', completed: true }],
      { title: '  Buy Unicorn   ' },
      { success: true },
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ]
    )
  );

  it(
    'does nothing if title is empty.',
    testAddTodo([{ id: 1, title: 'Taste JavaScript', completed: true }], { title: '  ' }, { success: true }, [
      { id: 1, title: 'Taste JavaScript', completed: true },
    ])
  );
});
