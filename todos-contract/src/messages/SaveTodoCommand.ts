import { CommandHandler } from './MessageHandler';
import { TodoId } from '../data/Todo';

export interface SaveTodoCommand {
  readonly id: TodoId;
  readonly title: string;
}

export type SaveTodoCommandHandler = CommandHandler<SaveTodoCommand>;
