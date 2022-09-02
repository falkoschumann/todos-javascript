import { AddTodoCommand, CommandStatus, Success, Todo, TodosRepository } from 'todos-contract';

export function createAddTodoCommandHandler(
  todosRepository: TodosRepository
): (command: AddTodoCommand) => Promise<CommandStatus> {
  function nextId(todos: readonly Todo[]): number {
    return (
      todos
        .map((todo) => todo.id)
        .reduce((previousValue, currentValue) => (previousValue > currentValue ? previousValue : currentValue), 0) + 1
    );
  }

  function addTodo(todos: readonly Todo[], title: string): readonly Todo[] {
    const id = nextId(todos);
    return [...todos, { id, title, completed: false }];
  }

  return async (command) => {
    const title = command.title.trim();
    if (title.length === 0) {
      return Promise.resolve(new Success());
    }

    let todos = await todosRepository.load();
    todos = addTodo(todos, title);
    await todosRepository.store(todos);
    return Promise.resolve(new Success());
  };
}
