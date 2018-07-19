import { scan } from 'rxjs/operators';
import Game from 'data/Game';
import { Action, ActionOrResolver } from './Action';
import { events, initializeEventStream } from './events';

export function dispatch(action: ActionOrResolver): void {
  let instance: Action;
  if (typeof action === "function") {
    instance = action();
  } else {
    instance = action;
  }
  events.next(instance);
}

export { initializeEventStream };

export default dispatch;
