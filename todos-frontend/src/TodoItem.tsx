import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';

import { Todo } from 'todos-contract';

import { DestroyIcon } from './DestroyIcon';

type TodoItemProps = Readonly<{
  todo: Todo;
  editing: boolean;
  onCancel(): void;
  onDestroy(): void;
  onEdit(): void;
  onSave(title: string): void;
  onToggle(): void;
}>;

export function TodoItem({ todo, editing, onCancel, onDestroy, onEdit, onSave, onToggle }: TodoItemProps) {
  return editing ? (
    <Edit title={todo.title} onCancel={onCancel} onSave={onSave} />
  ) : (
    <View todo={todo} onDestroy={onDestroy} onEdit={onEdit} onToggle={onToggle} />
  );
}

type ViewProps = Readonly<{
  todo: Todo;
  onDestroy(): void;
  onEdit(): void;
  onToggle(): void;
}>;

function View({ todo, onDestroy, onEdit, onToggle }: ViewProps) {
  function handleDoubleClick() {
    onEdit();
  }

  function handleToggle() {
    onToggle();
  }

  function handleDestroy() {
    onDestroy();
  }

  return (
    <li>
      <div className="group flex items-center h-12">
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
            'grow ml-2 p-2.5 text-sm font-medium text-gray-900 dark:text-gray-300': true,
            'line-through': todo.completed,
          })}
          onDoubleClick={handleDoubleClick}
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

type EditProps = Readonly<{
  title: string;
  onCancel(): void;
  onSave(title: string): void;
}>;

function Edit({ title, onCancel, onSave }: EditProps) {
  const [editText, setEditText] = useState(title);
  const editorRef = useRef<HTMLInputElement>(null);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEditText(event.target.value);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    switch (event.key) {
      case 'Enter':
        handleSubmit();
        break;
      case 'Escape':
        setEditText(title);
        onCancel();
        break;
    }
  }

  function handleSubmit() {
    const title = editText.trim();
    onSave(title);
    setEditText(title);
  }

  useEffect(() => {
    if (editorRef.current == null) {
      return;
    }

    editorRef.current.focus();
    editorRef.current.setSelectionRange(0, editorRef.current.value.length);
  }, []);

  return (
    <div className="h-12 w-full">
      <input
        ref={editorRef}
        type="text"
        className="ml-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={editText}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
