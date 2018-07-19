import { Observable, of } from 'rxjs';
import update from 'immutability-helper';

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

export abstract class BaseAction implements Action {
  public mutations(state: Game): object {
    return {};
  }

  public deriveActions(actions: Observable<Action>): Observable<Action> {
    return of();
  }

  public effects(state: Game): void {
  }

  public update(state: Game, actions: Observable<Action>): ActionResult {
    this.effects(state);
    const mutations = this.mutations(state);
    const newState = mutations ? update(state, mutations) : state;
    const newActions = this.deriveActions(actions);
    return { state: newState, actions: newActions };
  }
}
