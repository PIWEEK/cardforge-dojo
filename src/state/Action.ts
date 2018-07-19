import { Observable } from 'rxjs';
import Game from 'data/Game';

export interface Action {
  type?: Function;
  update?(state: Game, actions: Observable<Action>): ActionResult;
}

export type ActionResult = {
  state: Game,
  actions?: Observable<Action>
}

export type ActionResolver = () => Action;

export type ActionOrResolver = Action | ActionResolver

export default Action;
