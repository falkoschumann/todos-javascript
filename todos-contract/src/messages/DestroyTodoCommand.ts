import { CommandStatus } from './CommandStatus';

export interface DestroyTodoCommand {
  readonly id: number;
}

export type DestroyTodoCommandHandler = (command: DestroyTodoCommand) => Promise<CommandStatus>;
