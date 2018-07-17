import 'styles/global.css';

import SceneBuilder from 'scene';
import collections from 'data/collections';
import decks from 'data/decks';

function start() {
  const gameData = {
    ground: {
      background: require('assets/textures/rattan-wicker.jpg'),
    },

    objects: [
      {
        type: 'board',
        id: 'board-1',
        background: require('assets/textures/fabric-blue.png'),
        width: 1000,
        height: 800,
        offsetX: 0,
        offsetY: 0
      },
      {
        type: 'deck',
        id: 'deck-1',
        deck: 'spanish-deck-standard',
        startShuffled: true,
        position: [{
          relative: 'board-1',
          row: 10,
          column: 1
        }]
      }
    ]
  }

  const canvas = document.getElementById("main") as HTMLCanvasElement;

  const scene = SceneBuilder.build(canvas);
  scene.loadCollections(collections);
  scene.loadDecks(decks);
  scene.loadGame(gameData);
  scene.start();
}

start();
