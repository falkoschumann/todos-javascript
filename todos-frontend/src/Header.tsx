/* eslint-disable jsx-a11y/no-autofocus */

import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import classNames from 'classnames';

type HeaderProps = Readonly<{
  existsTodos: boolean;
  isAllCompleted: boolean;
  addTodo(title: string): void;
  toggleAll(checked: boolean): void;
}>;

export function Header({ existsTodos, isAllCompleted, addTodo, toggleAll }: HeaderProps) {
  const [newTitle, setNewTitle] = useState('');

  function handleToggleAll(event: ChangeEvent<HTMLInputElement>) {
    toggleAll(event.target.checked);
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTitle(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code !== 'Enter') {
      return;
    }

    if (newTitle.trim().length === 0) {
      return;
    }

    addTodo(newTitle);
    setNewTitle('');
  }

  return (
    <header className="p-4 sm:p-6">
      <h1 className="text-5xl font-extrabold text-center dark:text-white">Todos</h1>
      <div className="mt-6 flex items-center">
        {existsTodos && (
          <input
            checked={isAllCompleted}
            onChange={handleToggleAll}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        )}
        <input
          type="text"
          className={classNames({
            'ml-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500':
              true,
            'ml-6': !existsTodos,
          })}
          placeholder="What needs to be done?"
          autoFocus
          value={newTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </header>
  );
}
