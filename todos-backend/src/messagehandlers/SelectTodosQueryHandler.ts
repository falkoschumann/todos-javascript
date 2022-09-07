import { SelectTodosQuery, SelectTodosQueryResult, TodosRepository } from 'todos-contract';

export function createSelectTodosQueryHandler(
  todosRepository: TodosRepository
): (query: SelectTodosQuery) => Promise<SelectTodosQueryResult> {
  return async (_) => {
    const todos = await todosRepository.load();
    return Promise.resolve({ todos });
  };
}
