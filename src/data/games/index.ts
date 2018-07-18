import uuid from 'uuid/v4';
import Game from 'data/Game';

const boardId: string = `board-${uuid()}`;

export const defaultGame: Game = {
  objects: {
    ground: {
      type: 'ground',
      background: require('assets/textures/rattan-wicker.jpg'),
    },
    [boardId]: {
      type: 'board',
      background: require('assets/textures/fabric-blue.png'),
      width: 2.5,
      height: 1.5,
      depth: 0.02,
      offsetX: 0,
      offsetY: 0
    },
    [`deck-${uuid()}`]: {
      type: 'deck',
      deckRef: 'spanish-deck-standard',
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.4,
        offsetY: 0,
        offsetZ: 0.4
      }
    },
    [`deck-${uuid()}`]: {
      type: 'deck',
      deckRef: 'poker-deck',
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.7,
        offsetY: 0,
        offsetZ: 0.4
      }
    },
    [`card-${uuid()}`]: {
      type: 'card',
      collectionRef: 'spanish-deck-collection',
      cardRef: 'coins-1',
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.4,
        offsetY: 0,
        offsetZ: 0.8
      }
    },
    [`card-${uuid()}`]: {
      type: 'card',
      collectionRef: 'english-deck-collection',
      cardRef: 'hearts-10',
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.7,
        offsetY: 0,
        offsetZ: 0.8
      }
    },
  }
};
