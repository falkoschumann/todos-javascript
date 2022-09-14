import { CommandStatus } from './CommandStatus';

export type MessageHandler<Request, Response> = (request: Request) => Response;

export type CommandHandler<Command> = MessageHandler<Command, Promise<CommandStatus>>;

export type QueryHandler<Query, Result> = MessageHandler<Query, Promise<Result>>;

export interface Notification {
  readonly type: string;
}

export type NotificationHandler<N extends Notification> = MessageHandler<N, void>;
