import 'styles/global.css';

import SceneBuilder from 'scene';

import collections from 'data/collections';
import decks from 'data/decks';
import { defaultGame } from 'data/games';

function start() {
  const canvas = document.getElementById("main") as HTMLCanvasElement;
  const scene = SceneBuilder.build(canvas);
  scene.loadCollections(collections);
  scene.loadDecks(decks);
  scene.start();
  scene.updateState(defaultGame);
}

start();
