import { AddTodoCommand, CommandStatus, Success, Todo, TodosRepository } from 'todos-contract';
import { normalizeTitle } from './normalizeTitle';

export function createAddTodoCommandHandler(
  todosRepository: TodosRepository
): (command: AddTodoCommand) => Promise<CommandStatus> {
  return async (command) => {
    const title = normalizeTitle(command.title);
    if (title.length === 0) {
      return Promise.resolve(new Success());
    }

    let todos = await todosRepository.load();
    todos = addTodo(todos, title);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}

function addTodo(todos: readonly Todo[], title: string): readonly Todo[] {
  let id = todos
    .map((todo) => todo.id)
    .reduce((previousValue, currentValue) => (previousValue > currentValue ? previousValue : currentValue), 0);
  id++;
  return [...todos, { id, title, completed: false }];
}
