import 'styles/global.css';

import SceneBuilder from 'scene';
import uuid from 'uuid/v4';

function times(num) {
  return [...Array(num).keys()];
}

function createCollection(
  suitId: string,
  suitName: string,
  numItems: number,
  sprite: string,
  position: (number) => [ number, number ]
): any[] {
  return times(numItems).map((v) => ({
    id: `${suitId}-${ v + 1 }`,
    name: `${suitName} (${ v + 1 })`,
    sprite,
    position: position(v),
  }));
}

function start() {
  const collectionData: any = [{
    id: 'spanish-deck-collection',
    name: 'Spanish deck',

    sprites: [{
      id: 'spanish-deck',
      url: require('assets/img/spanish_deck.png'),
      width: 2496,
      height: 1595,
      columns: 12,
      rows: 5
    }],

    backface: {
      sprite: 'spanish-deck',
      position: [ 4, 1 ]
    },

    cards: [
      ...createCollection('coins', 'Coins', 12, 'spanish-deck', (v) => [ 0, v ]),
      ...createCollection('cups', 'Cups', 12, 'spanish-deck', (v) => [ 1, v ]),
      ...createCollection('swords', 'Swords', 12, 'spanish-deck', (v) => [ 2, v ]),
      ...createCollection('cubs', 'Cubs', 12, 'spanish-deck', (v) => [ 3, v ]),
    ]
  }];

  const decksData: any = [{
    id: 'spanish-deck-standard',
    collection: 'spanish-deck-collection',
    name: 'Standard deck',
    cards: [
      ...(times(7).map((v) => ({
        id: `coins-${v + 1}`,
        instances: 1
      }))),
      ...(times(3).map((v) => ({
        id: `coins-${v + 10}`,
        instances: 1
      }))),
      ...(times(7).map((v) => ({
        id: `cups-${v + 1}`,
        instances: 1
      }))),
      ...(times(3).map((v) => ({
        id: `cups-${v + 10}`,
        instances: 1
      }))),
      ...(times(7).map((v) => ({
        id: `swords-${v + 1}`,
        instances: 1
      }))),
      ...(times(3).map((v) => ({
        id: `swords-${v + 10}`,
        instances: 1
      }))),
      ...(times(7).map((v) => ({
        id: `cubs-${v + 1}`,
        instances: 1
      }))),
      ...(times(3).map((v) => ({
        id: `cubs-${v + 10}`,
        instances: 1
      }))),
    ]
  }];

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
  scene.start();
}

start();
