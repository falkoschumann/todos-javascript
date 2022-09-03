import { expect } from 'chai';

import { Todo } from 'todos-contract';

import { Filter } from './Filter';
import { getTodosProjection } from './TodosProjection';

function testTodosProjection(
  whenTodos: readonly Todo[],
  whenFilter: Filter,
  thenExistsTodos: boolean,
  thenShownTodos: readonly Todo[],
  thenIsAllCompleted: boolean,
  thenActiveTodos: number,
  thenExistsCompleted: boolean
) {
  const { existsTodos, shownTodos, isAllCompleted, activeCount, existsCompleted } = getTodosProjection(
    whenTodos,
    whenFilter
  );

  expect(existsTodos, 'exists todos').to.be.equal(thenExistsTodos);
  expect(shownTodos, 'shown todos').to.be.deep.equal(thenShownTodos);
  expect(isAllCompleted, 'is all completed').to.be.equal(thenIsAllCompleted);
  expect(activeCount, 'active count').to.be.equal(thenActiveTodos);
  expect(existsCompleted, 'exists completed').to.be.equal(thenExistsCompleted);
}

describe('Todos projection', () => {
  it('is empty.', async () => {
    testTodosProjection([], Filter.All, false, [], false, 0, false);
  });

  it('shows all.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.All,
      true,
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      false,
      1,
      true
    );
  });

  it('shows active.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.Active,
      true,
      [{ id: 2, title: 'Buy Unicorn', completed: false }],
      false,
      1,
      true
    );
  });

  it('shows completed.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.Completed,
      true,
      [{ id: 1, title: 'Taste JavaScript', completed: true }],
      false,
      1,
      true
    );
  });

  it('contains only active.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: false },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.Active,
      true,
      [
        { id: 1, title: 'Taste JavaScript', completed: false },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      false,
      2,
      false
    );
  });

  it('contains only completed.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: true },
      ],
      Filter.Completed,
      true,
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: true },
      ],
      true,
      0,
      true
    );
  });
});
