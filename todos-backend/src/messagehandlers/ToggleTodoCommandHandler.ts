import { CommandStatus, Success, Todo, TodoId, TodosRepository, ToggleTodoCommand } from 'todos-contract';

export function createToggleTodoCommandHandler(
  todosRepository: TodosRepository
): (command: ToggleTodoCommand) => Promise<CommandStatus> {
  return async (command) => {
    let todos = await todosRepository.load();
    todos = toggleTodo(todos, command.id);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}

function toggleTodo(todos: readonly Todo[], id: TodoId): readonly Todo[] {
  return todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
}
