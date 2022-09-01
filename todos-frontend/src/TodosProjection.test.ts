import { expect } from 'chai';

import { Todo } from 'todos-contract';

import { Filter } from './Filter';
import { useTodosProjection } from './TodosProjection';

function testTodosProjection(
  whenTodos: readonly Todo[],
  whenFilter: Filter,
  thenShownTodos: readonly Todo[],
  thenActiveTodos: number
) {
  const { shownTodos, activeCount } = useTodosProjection(whenTodos, whenFilter);

  expect(shownTodos).to.be.deep.equal(thenShownTodos);
  expect(activeCount).to.be.equal(thenActiveTodos);
}

describe('Todos projection', () => {
  it('is empty.', async () => {
    testTodosProjection([], Filter.All, [], 0);
  });

  it('shows all.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.All,
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      1
    );
  });

  it('shows active.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.Active,
      [{ id: 2, title: 'Buy Unicorn', completed: false }],
      1
    );
  });

  it('shows completed.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.Completed,
      [{ id: 1, title: 'Taste JavaScript', completed: true }],
      1
    );
  });

  it('contains only active.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: false },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      Filter.Active,
      [
        { id: 1, title: 'Taste JavaScript', completed: false },
        { id: 2, title: 'Buy Unicorn', completed: false },
      ],
      2
    );
  });

  it('contains only completed.', async () => {
    testTodosProjection(
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: true },
      ],
      Filter.Completed,
      [
        { id: 1, title: 'Taste JavaScript', completed: true },
        { id: 2, title: 'Buy Unicorn', completed: true },
      ],
      0
    );
  });
});
