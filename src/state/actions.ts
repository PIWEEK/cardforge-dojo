import { Observable, interval, of, merge } from 'rxjs';
import { map, takeWhile, filter, tap, flatMap, endWith } from 'rxjs/operators';

import Game from 'data/Game';
import { Action, ActionResult } from './Action';

import update from 'immutability-helper';

function Typed(target) {
  target.prototype.type = target;
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
        filter((a) => a.type === MouseDown),
        flatMap((a) => merge(
          of(new StartDragging(this.cardId)),
          actions.pipe(
            takeWhile((a) => a.type !== MouseUp),
            filter((a) => a.type === MouseGroundIntersects),
            map((a: MouseGroundIntersects) => new MoveCard(this.cardId, a.point)),
            endWith(new EndDragging(this.cardId))
          ))))
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
export class MouseDown implements Action {
  public update(state: Game): ActionResult {
    return { state };
  }
}

@Typed
export class MouseUp implements Action {
  public update(state: Game): ActionResult {
    return { state };
  }
}

@Typed
export class StartDragging implements Action {
  constructor(public cardId: string) {}

  public update(state: Game): ActionResult {
    const newState = update(state, {
      objects: {
        [this.cardId]: {
          dragging: {
            $set: true
          }
        }
      }});
    return { state: newState };
  }
}

@Typed
export class EndDragging implements Action {
  constructor(public cardId: string) {}

  public update(state: Game): ActionResult {
    const newState = update(state, {
      objects: {
        [this.cardId]: {
          dragging: {
            $set: false
          }
        }
      }});
    return { state: newState };
  }
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

@Typed
export class MoveCard implements Action {
  constructor(
    public cardId,
    public point: THREE.Vector3
  ) {}

  public update(old: Game): ActionResult {
    const op = {
      objects: {
        [ this.cardId ]: {
          position: {
            $set: {
              type: 'absolute',
              x: this.point.x,
              y: this.point.y,
              z: this.point.z
            }
          }
        }
      }
    }
    return { state: update(old, op) };
  }
}
