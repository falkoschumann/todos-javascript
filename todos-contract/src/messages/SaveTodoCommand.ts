import { CommandStatus } from './CommandStatus';
import { TodoId } from '../data/Todo';

export interface SaveTodoCommand {
  readonly id: TodoId;
  readonly title: string;
}

export type SaveTodoCommandHandler = (command: SaveTodoCommand) => Promise<CommandStatus>;
