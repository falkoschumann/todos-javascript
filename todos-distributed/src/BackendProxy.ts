import {
  AddTodoCommandHandler,
  ClearCompletedCommandHandler,
  DestroyTodoCommandHandler,
  SaveTodoCommandHandler,
  SelectTodosQueryHandler,
  ToggleAllCommandHandler,
  ToggleTodoCommandHandler,
} from 'todos-contract';

export function createAddTodoCommandHandler(): AddTodoCommandHandler {
  return async (command) => {
    const response = await fetch('/api/add-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    return response.json();
  };
}

export function createClearCompletedCommandHandler(): ClearCompletedCommandHandler {
  return async (command) => {
    const response = await fetch('/api/clear-completed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    return response.json();
  };
}

export function createDestroyTodoCommandHandler(): DestroyTodoCommandHandler {
  return async (command) => {
    const response = await fetch('/api/destroy-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    return response.json();
  };
}

export function createSaveTodoCommandHandler(): SaveTodoCommandHandler {
  return async (command) => {
    const response = await fetch('/api/save-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    return response.json();
  };
}

export function createSelectTodosQueryHandler(): SelectTodosQueryHandler {
  return async () => {
    const response = await fetch('/api/select-todos', { method: 'GET' });
    return response.json();
  };
}

export function createToggleAllCommandHandler(): ToggleAllCommandHandler {
  return async (command) => {
    const response = await fetch('/api/toggle-all', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    return response.json();
  };
}

export function createToggleTodoCommandHandler(): ToggleTodoCommandHandler {
  return async (command) => {
    const response = await fetch('/api/toggle-todo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    return response.json();
  };
}
