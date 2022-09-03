import { CommandStatus, Success, Todo, TodosRepository, ToggleAllCommand } from 'todos-contract';

export function createToggleAllCommandHandler(
  todosRepository: TodosRepository
): (command: ToggleAllCommand) => Promise<CommandStatus> {
  return async (command) => {
    let todos = await todosRepository.load();
    todos = toggleAll(todos, command.checked);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}

function toggleAll(todos: readonly Todo[], checked: boolean): readonly Todo[] {
  return todos.map((todo) => ({ ...todo, completed: checked }));
}
