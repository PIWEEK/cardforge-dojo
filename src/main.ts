import 'styles/global.css';
import 'state/keyboard';

import SceneBuilder from 'scene';
import collections from 'data/collections';
import decks from 'data/decks';

import { defaultGame } from 'data/games';
import { initializeEventStream, dispatch } from './state';
import { InitializeState } from './state/actions';

import MenuBuilder from 'scene/builders/MenuBuilder'
import { times } from 'utils';

function start() {
  // Attach the scene to #main element
  const canvas = document.getElementById("main") as HTMLCanvasElement;

  // Setup the card databases
  const scene = SceneBuilder.build(canvas);
  scene.loadCollections(collections);
  scene.loadDecks(decks);
  scene.start();

  // This starts the Subject that is aware of actions
  initializeEventStream(scene.update.bind(scene));

  // Dispatch the initialization
  dispatch(new InitializeState(defaultGame));

  // Test
  //console.log(MenuBuilder.buildMenu(times(10).map((x) => `option${x}`)));
}

start();
