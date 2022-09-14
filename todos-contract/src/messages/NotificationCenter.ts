import { EventEmitter } from 'events';

import { Notification, NotificationHandler } from './MessageHandler';

const eventEmitter = new EventEmitter();

export class NotificationCenter {
  static DEFAULT = new NotificationCenter();

  send(n: Notification) {
    eventEmitter.emit(n.type, n);
  }

  subscribe(type: string, handler: NotificationHandler<Notification>) {
    eventEmitter.addListener(type, handler);
  }

  unsubscribe(type: string, handler: NotificationHandler<Notification>) {
    eventEmitter.removeListener(type, handler);
  }
}
