import { CommandStatus, DestroyTodoCommand, Success, Todo, TodoId, TodosRepository } from 'todos-contract';

export function createDestroyTodoCommandHandler(
  todosRepository: TodosRepository
): (command: DestroyTodoCommand) => Promise<CommandStatus> {
  return async (command) => {
    let todos = await todosRepository.load();
    todos = destroyTodo(todos, command.id);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}

function destroyTodo(todos: readonly Todo[], id: TodoId): readonly Todo[] {
  return todos.filter((todo) => todo.id != id);
}
