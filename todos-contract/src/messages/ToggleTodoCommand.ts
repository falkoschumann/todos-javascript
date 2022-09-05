import { CommandStatus } from './CommandStatus';

export interface ToggleTodoCommand {
  readonly id: number;
}

export type ToggleTodoCommandHandler = (command: ToggleTodoCommand) => Promise<CommandStatus>;
