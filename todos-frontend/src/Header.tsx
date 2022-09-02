import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

interface HeaderProps {
  addTodo(title: string): void;
}

export function Header({ addTodo }: HeaderProps) {
  const [newTitle, setNewTitle] = useState('');

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
      <div className="mt-6">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
