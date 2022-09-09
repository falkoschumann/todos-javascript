import { CommandStatus } from './CommandStatus';

export type MessageHandler<Request, Response> = (request: Request) => Promise<Response>;

export type CommandHandler<Command> = MessageHandler<Command, CommandStatus>;

export type QueryHandler<Query, Result> = MessageHandler<Query, Result>;

export interface Notification {
  readonly type: string;
}

export type NotificationHandler<N extends Notification> = MessageHandler<N, void>;
