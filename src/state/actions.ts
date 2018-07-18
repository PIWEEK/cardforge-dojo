import { interval } from 'rxjs';
import { map } from 'rxjs/operators';

import Game from 'data/Game';
import { Action, ActionResult } from 'state';

import update from 'immutability-helper';

export class Noop implements Action {
  public update(state: Game): ActionResult {
    return { state };
  }
}

export class InitializeState implements Action {
  constructor(private state: Game) {}

  public update(state: Game): ActionResult {
    return {
      state: this.state,
    }
  }
}

export class MouseEntersCard implements Action {
  constructor(private cardId: string) {}

  public update(state: Game): ActionResult {
    const newState = update(state, {
      objects: {
        [this.cardId]: {
          selected: {
            $set: true
          }
        }
      }});
    return { state: newState };
  }
}

export class MouseExistsCard implements Action {
  constructor(private cardId: string) {}

  public update(state: Game): ActionResult {
    const newState = update(state, {
      objects: {
        [this.cardId]: {
          selected: {
            $set: false
          }
        }
      }});
    return { state: newState };
  }
}
