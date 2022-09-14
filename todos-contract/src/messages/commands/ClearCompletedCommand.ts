import { CommandHandler } from '../MessageHandler';

// Command is empty.
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClearCompletedCommand {}

export type ClearCompletedCommandHandler = CommandHandler<ClearCompletedCommand>;
