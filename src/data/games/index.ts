import uuid from 'uuid/v4';
import Game from 'data/Game';

const boardId: string = uuid();

export const defaultGame: Game = {
  ground: {
    background: require('assets/textures/rattan-wicker.jpg'),
  },

  objects: [
    {
      type: 'board',
      id: boardId,
      background: require('assets/textures/fabric-blue.png'),
      width: 1000,
      height: 800,
      depth: 0.1,
      offsetX: 0,
      offsetY: 0
    },
    {
      type: 'deck',
      id: uuid(),
      deckRef: 'spanish-deck-standard',
      position: {
        type: 'relativeGrid',
        ref: boardId,
        row: 10,
        column: 1
      }
    },
    {
      type: 'deck',
      id: uuid(),
      deckRef: 'spanish-deck-standard',
      position: {
        type: 'relativeGrid',
        ref: boardId,
        row: 10,
        column: 1
      }
    },
    {
      type: 'card',
      id: uuid(),
      collectionRef: 'english-deck-collection',
      cardRef: 'hearts-1',
      position: {
        type: 'relativeGrid',
        ref: boardId,
        row: 10,
        column: 1
      }
    }
  ]
};
