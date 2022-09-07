import { ClearCompletedCommand, CommandStatus, Success, Todo, TodosRepository } from 'todos-contract';

export function createClearCompletedCommandHandler(
  todosRepository: TodosRepository
): (command: ClearCompletedCommand) => Promise<CommandStatus> {
  return async (_) => {
    let todos = await todosRepository.load();
    todos = clearCompleted(todos);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}

function clearCompleted(todos: readonly Todo[]): readonly Todo[] {
  return todos.filter((todo) => !todo.completed);
}
