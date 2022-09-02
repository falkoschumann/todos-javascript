import classNames from 'classnames';
import React from 'react';

import { Todo } from 'todos-contract';

import { DestroyIcon } from './DestroyIcon';

type TodoItemProps = Readonly<{
  todo: Todo;
  destroy(): void;
  toggle(): void;
}>;

export function TodoItem({ todo, destroy, toggle }: TodoItemProps) {
  function handleToggle() {
    toggle();
  }

  function handleDestroy() {
    destroy();
  }

  return (
    <li>
      <div className="group flex items-center mb-4 h-6">
        <input
          checked={todo.completed}
          onChange={handleToggle}
          id={`${todo.id}`}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`${todo.id}`}
          className={classNames({
            'grow ml-2 text-sm font-medium text-gray-900 dark:text-gray-300': true,
            'line-through': todo.completed,
          })}
        >
          {todo.title}
        </label>
        <button
          type="button"
          onClick={handleDestroy}
          className="hidden group-hover:block text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800"
        >
          <DestroyIcon />
          <span className="sr-only">remove</span>
        </button>
      </div>
    </li>
  );
}
