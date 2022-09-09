import { CommandHandler } from './MessageHandler';
import { TodoId } from '../data/Todo';

export interface DestroyTodoCommand {
  readonly id: TodoId;
}

export type DestroyTodoCommandHandler = CommandHandler<DestroyTodoCommand>;
