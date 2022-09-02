import { CommandStatus, Success, Todo, TodosRepository, ToggleTodoCommand } from 'todos-contract';

export function createToggleTodoCommandHandler(
  todosRepository: TodosRepository
): (command: ToggleTodoCommand) => Promise<CommandStatus> {
  function toggleTodo(todos: readonly Todo[], id: number): readonly Todo[] {
    return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
  }

  return async (command) => {
    let todos = await todosRepository.load();
    todos = toggleTodo(todos, command.id);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}
