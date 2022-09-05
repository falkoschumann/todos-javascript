import { CommandStatus } from './CommandStatus';
import { TodoId } from '../data/Todo';

export interface ToggleTodoCommand {
  readonly id: TodoId;
}

export type ToggleTodoCommandHandler = (command: ToggleTodoCommand) => Promise<CommandStatus>;
