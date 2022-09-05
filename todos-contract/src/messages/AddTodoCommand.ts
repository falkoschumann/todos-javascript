import { CommandStatus } from './CommandStatus';

export interface AddTodoCommand {
  readonly title: string;
}

export type AddTodoCommandHandler = (command: AddTodoCommand) => Promise<CommandStatus>;
