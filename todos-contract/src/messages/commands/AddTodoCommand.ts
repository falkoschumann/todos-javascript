import { CommandHandler } from '../MessageHandler';

export interface AddTodoCommand {
  readonly title: string;
}

export type AddTodoCommandHandler = CommandHandler<AddTodoCommand>;
