import { CommandStatus } from './CommandStatus';

export interface ToggleAllCommand {
  readonly checked: boolean;
}

export type ToggleAllCommandHandler = (command: ToggleAllCommand) => Promise<CommandStatus>;
