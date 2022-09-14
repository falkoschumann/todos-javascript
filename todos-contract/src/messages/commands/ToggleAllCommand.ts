import { CommandHandler } from '../MessageHandler';

export interface ToggleAllCommand {
  readonly checked: boolean;
}

export type ToggleAllCommandHandler = CommandHandler<ToggleAllCommand>;
