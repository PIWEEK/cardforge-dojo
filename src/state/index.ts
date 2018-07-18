import { Subject, Observable } from 'rxjs';

import Game from 'data/Game';

export const events = new Subject<Action>();

export type ActionResult = { state: Game, actions?: Observable<Action> }
export interface Action {
  type?: Function;
  update?(state: Game, actions: Observable<Action>): ActionResult;
}

type ActionResolver = () => Action;
type ActionOrResolver = Action | ActionResolver

export function dispatch(action: ActionOrResolver): void {
  let instance: Action;
  if (typeof action === "function") {
    instance = action();
  } else {
    instance = action;
  }
  events.next(instance);
}
