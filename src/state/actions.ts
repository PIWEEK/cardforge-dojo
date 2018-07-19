import { Observable, interval } from 'rxjs';
import { map, takeWhile, filter, tap } from 'rxjs/operators';

import Game from 'data/Game';
import { Action, ActionResult } from './Action';

import update from 'immutability-helper';

function Typed(target) {
  target.prototype.type = target;
  console.log(target.name);
  return target;
}

@Typed
export class Noop implements Action {
  public update(state: Game): ActionResult {
    // Ugly type hack in order to workaround typescript types
    console.log("Noop: " + (<any>this)['type'].name);
    return { state };
  }
}

@Typed
export class Log implements Action {
  constructor(public log: string) {}

  public update(state: Game): ActionResult {
    console.log(this.log);
    return { state }
  }
}

@Typed
export class InitializeState implements Action {
  constructor(private state: Game) {}

  public update(state: Game): ActionResult {
    console.log(this);
    return {
      state: this.state,
    }
  }
}

@Typed
export class MouseEntersCard implements Action {
  constructor(public cardId: string) {}

  public update(state: Game, actions: Observable<Action>): ActionResult {
    const newState = update(state, {
      objects: {
        [this.cardId]: {
          selected: {
            $set: true
          }
        }
      }});

    const newActions =
      actions.pipe(
        takeWhile((a) => a.type !== MouseExistsCard),
        filter((a) => a.type === MouseClick),
        map((a) => new Log("OK!: " + this.cardId))
      )
    return { state: newState, actions: newActions};
  }
}

@Typed
export class MouseExistsCard implements Action {
  constructor(public cardId: string) {}

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

@Typed
export class MouseGroundIntersects extends Noop {
  constructor(public point: THREE.Vector3) {
    super();
  }
  public update(state: Game): ActionResult {
    const { x, y, z} = this.point;

    return { state: update(state, {
      mouse: mouse => update(mouse || {}, {
        ground: ground => update(ground || {}, {
          $set: { x, y, z }
        })
      })})};
  }
}

@Typed
export class MouseClick extends Noop {
}

@Typed
export class FlipSelectedObject implements Action {

  public update(oldState: Game): ActionResult {
    let state = oldState;

    const selected: any = Object
      .entries(state.objects)
      .find(([id, value]) => (<any>value).selected);

    if (selected) {
      const op = {
        objects: {
          [selected[0]]: {
            $toggle: ['flip']
          }
        }
      };

      state = update(state, op)
    }

    return { state };
  }
}
