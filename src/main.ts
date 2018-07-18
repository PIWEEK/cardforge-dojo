import 'styles/global.css';

import update from 'immutability-helper';
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
  scene.update(defaultGame);
  scene.update(update(defaultGame, {
    objects: {
      ground: {
        background: {
          $set: 'kk.png'
        }
      }
    }
  }));
}

start();
