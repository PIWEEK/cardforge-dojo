import 'styles/global.css';

import update from 'immutability-helper';
import SceneBuilder from 'scene';
import collections from 'data/collections';
import decks from 'data/decks';
import { defaultGame } from 'data/games';
import { Action, ActionResult, events, dispatch } from './state';
import { InitializeState } from './state/actions';
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
    scan((result: ActionResult, action: Action) => action.update(result.state, events), {})
  ).subscribe((result: ActionResult) => {
    console.log("Update");
    scene.update(result.state);
    if (result.actions) {
      result.actions.subscribe(events);
    }
  });

  dispatch(new InitializeState(defaultGame));
}

start();
