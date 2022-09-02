import classNames from 'classnames';
import React from 'react';

import { Todo } from 'todos-contract';

interface TodoItemProps {
  readonly todo: Todo;
  toggle(): void;
}

export function TodoItem({ todo, toggle }: TodoItemProps) {
  function handleChange() {
    toggle();
  }

  return (
    <li>
      <div className="flex items-center mb-4">
        <input
          checked={todo.completed}
          onChange={handleChange}
          id={`${todo.id}`}
          type="checkbox"
          className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`${todo.id}`}
          className={classNames({
            'ml-2 text-sm font-medium text-gray-900 dark:text-gray-300': true,
            'line-through': todo.completed,
          })}
        >
          {todo.title}
        </label>
      </div>
    </li>
  );
}
