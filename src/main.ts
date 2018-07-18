import 'styles/global.css';

import update from 'immutability-helper';
import SceneBuilder from 'scene';
import collections from 'data/collections';
import decks from 'data/decks';
import { defaultGame } from 'data/games';
import { Action, ActionResult, events, dispatch } from './state';
import { InitializeState, Log } from './state/actions';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import Game from 'data/Game';

function start() {
  const canvas = document.getElementById("main") as HTMLCanvasElement;
  const scene = SceneBuilder.build(canvas);
  scene.loadCollections(collections);
  scene.loadDecks(decks);
  scene.start();

  events.pipe(
    scan((result: ActionResult, action: Action) => {
      if (!action.update) {
        return result;
      }

      const { state, actions } = action.update(result.state, events);

      if (!state) {
        return { state: result.state, actions }
      }

      return {state, actions}
    }, {})
  ).subscribe(
    (result: ActionResult) => {
      scene.update(result.state);
      if (result.actions) {
        // result.actions.subscribe(events);
        result.actions.subscribe(
          (v) => events.next(v),
          (e) => events.next(new Log(`Error ${e}`))
        )
      }
    },
    (error) => console.error(error),
    () => console.log("nooo")
  );

  dispatch(new InitializeState(defaultGame));
}

start();
