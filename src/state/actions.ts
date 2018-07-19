import update from 'immutability-helper';
import uuid from 'uuid/v4';
import { Observable, interval, of, merge, asyncScheduler } from 'rxjs';
import { map, takeWhile, filter, tap, flatMap, endWith, take, observeOn } from 'rxjs/operators';

import * as dom from 'utils/dom';
import Game from 'data/Game';
import { BaseAction, Action, ActionResult } from './Action';


function Typed(target) {
  target.prototype.type = target;
  return target;
}

@Typed
export class Log extends BaseAction {
  constructor(public log: string) {
    super();
  }

  public effects() {
    console.log(this.log);
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
export class MouseEntersCard extends BaseAction {
  constructor(public cardId: string) {
    super();
  }

  public effects() {
    dom.changeCursor('hover');
  }

  public mutations() {
    return {
      objects: {
        [this.cardId]: { selected: { $set: true } }
      }
    };
  }

  public deriveActions(actions: Observable<Action>) {
    return actions.pipe(
      takeWhile((a) => a.type !== MouseExistsCard),
      filter((a) => a.type === MouseDown),
      flatMap((a) => merge(
        of(new StartDragging(this.cardId)).pipe(
          observeOn(asyncScheduler)
        ),
        actions.pipe(
          takeWhile((a) => a.type !== MouseUp),
          filter((a) => a.type === MouseGroundIntersects),
          map((a: MouseGroundIntersects) => new MoveCard(this.cardId, a.point)),
          endWith(new EndDragging(this.cardId))
        )
      )));
  }
}

@Typed
export class MouseExistsCard extends BaseAction {
  constructor(public cardId: string) {
    super();
  }

  public effects() {
    dom.clearCursor();
  }

  public mutations() {
    return {
      objects: {
        [this.cardId]: {
          selected: { $set: false }
        }
      }
    };
  }
}

@Typed
export class MouseGroundIntersects extends BaseAction {
  constructor(public point: THREE.Vector3) {
    super();
  }

  public mutations(): object {
    const { x, y, z} = this.point;
    return {
      mouse: mouse => update(mouse || {}, {
        ground: ground => update(ground || {}, {
          $set: { x, y, z }
        })
      })
    }
  }
}

@Typed
export class MouseDown extends BaseAction {
}

@Typed
export class MouseUp extends BaseAction {
}

@Typed
export class StartDragging extends BaseAction {
  constructor(public cardId: string) {
    super();
  }

  public effects() {
    dom.changeCursor('dragging');
  }

  public mutations() {
    return {
      dragging: { $set: true },
      objects: {
        [this.cardId]: {
          dragging: { $set: true }
        }
      }
    };
  }
}

@Typed
export class EndDragging extends BaseAction {
  constructor(public cardId: string) {
    super();
  }

  public effects() {
    dom.clearCursor();
  }

  public mutations() {
    return {
      dragging: { $set: false },
      objects: {
        [this.cardId]: {
          selected: { $set: false },
          dragging: { $set: false }
        }
      }
    };
  }
}

@Typed
export class FlipSelectedObject extends BaseAction {

  public mutations(state: Game) {
    const selected: any = Object
      .entries(state.objects)
      .find(([id, value]) => (<any>value).selected);

    if (selected) {
      return {
        objects: {
          [selected[0]]: {
            $toggle: ['flip']
          }
        }
      };
    }
  }
}

@Typed
export class MoveCard extends BaseAction {
  constructor(
    public cardId,
    public point: THREE.Vector3
  ) {
    super();
  }

  public mutations() {
    return {
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
        }}};
  }

}

@Typed
export class MouseEntersDeck extends BaseAction {
  constructor(public deckId: string) {
    super();
  }

  public mutations(): object {
    return {
      objects: {
        [this.deckId]: {
          selected: { $set: true }
        }
      }
    };
  }

  public deriveActions(actions: Observable<Action>): Observable<Action> {
    return actions.pipe(
      takeWhile((a) => a.type !== MouseExitsDeck),
      filter((a) => a.type === MouseDown),
      flatMap(
        () => actions.pipe(
          filter((a) => a.type === MouseGroundIntersects),
          take(1),
          flatMap((moveAction: MouseGroundIntersects) => merge(
            of(new PopupCard(this.deckId, moveAction.point)).pipe(
              observeOn(asyncScheduler)
            ),
            actions.pipe(
              filter((a) => a.type === CardCreated),
              take(1),
              flatMap((cardCreated: CardCreated) => merge(
                of(new StartDragging(cardCreated.cardId)),
                actions.pipe(
                  takeWhile((a) => a.type !== MouseUp),
                  filter((a) => a.type === MouseGroundIntersects),
                  map((a: MouseGroundIntersects) => new MoveCard(cardCreated.cardId, a.point)),
                  endWith(new EndDragging(cardCreated.cardId))
                )
              )))
          ))
        ))
    );
  }

}

@Typed
export class MouseExitsDeck extends BaseAction {
  constructor(public deckId: string) {
    super();
  }

  public mutations(): object {
    return {
      objects: {
        [this.deckId]: {
          selected: { $set: false }
        }
      }
    };
  }
}

@Typed
export class PopupCard implements Action {
  constructor(public deckId: string,
              public point: THREE.Vector3) {}

  public mutations(state, cardId: string): object {
    const cards = state.objects[this.deckId].cards;
    const lastIdx = cards.length - 1;
    const cardData = cards[lastIdx];

    return {
      objects: {
        [this.deckId]: {
          cards: {
            $splice: [[lastIdx, 1]]
          }
        },
        [cardId]: {
          $set: {
            ...cardData,
            selected: true,
            position: {
              type: 'absolute',
              x: this.point.x,
              y: this.point.y,
              z: this.point.z
            }
          }}
      }
    };
  }

  public deriveActions(cardId: string): Observable<Action> {
    return of(new CardCreated(cardId));
  }

  public update(state: Game, actions: Observable<Action>): ActionResult {
    const cardId = `card-${uuid()}`;
    const newState = update(state, this.mutations(state, cardId));
    const newActions = this.deriveActions(cardId);
    return { state: newState, actions: newActions };
  }

}

@Typed
export class CardCreated extends BaseAction {
  constructor(public cardId: string) {
    super();
  }
}
