import { CommandStatus, SaveTodoCommand, Success, Todo, TodoId, TodosRepository } from 'todos-contract';

import { normalizeTitle } from './normalizeTitle';

export function createSaveTodoCommandHandler(
  todosRepository: TodosRepository
): (command: SaveTodoCommand) => Promise<CommandStatus> {
  return async (command) => {
    let todos = await todosRepository.load();
    todos = saveTodo(todos, command.id, command.title);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}

function saveTodo(todos: readonly Todo[], id: TodoId, title: string): readonly Todo[] {
  title = normalizeTitle(title);
  if (title.length === 0) {
    return todos.filter((todo) => todo.id != id);
  } else {
    return todos.map((todo) => (todo.id === id ? { ...todo, title } : todo));
  }
}
