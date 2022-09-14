import { CommandHandler } from '../MessageHandler';
import { TodoId } from '../../data/Todo';

export interface ToggleTodoCommand {
  readonly id: TodoId;
}

export type ToggleTodoCommandHandler = CommandHandler<ToggleTodoCommand>;
