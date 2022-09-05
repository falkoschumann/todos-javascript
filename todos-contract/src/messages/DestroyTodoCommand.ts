import { CommandStatus } from './CommandStatus';
import { TodoId } from '../data/Todo';

export interface DestroyTodoCommand {
  readonly id: TodoId;
}

export type DestroyTodoCommandHandler = (command: DestroyTodoCommand) => Promise<CommandStatus>;
