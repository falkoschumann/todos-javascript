import { CommandStatus } from './CommandStatus';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ClearCompletedCommand {}

export type ClearCompletedCommandHandler = (command: ClearCompletedCommand) => Promise<CommandStatus>;
