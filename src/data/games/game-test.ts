import uuid from 'uuid/v4';
import Collection from 'data/Collection';
import Deck from 'data/Deck';
import { Game, GroundData, DeckData, CardData, BoardData } from 'data/Game';
import { randomDeck } from './utils';

const boardId: string = `board-${uuid()}`;

export const game = (collections: Collection[], decks: Deck[]) => ({
  objects: {
    "ground": {
      type: 'ground',
      background: require('assets/textures/rattan-wicker.jpg') as string,
    } as GroundData,
    [boardId]: {
      type: 'board',
      background: require('assets/textures/fabric-blue.png'),
      width: 2.5,
      height: 1.5,
      depth: 0.02,
      offsetX: 0,
      offsetY: 0
    } as BoardData,
    [`deck-${uuid()}`]: {
      type: 'deck',
      deckRef: 'spanish-deck-standard',
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.4,
        offsetY: 0,
        offsetZ: 0.4
      },
      cards: randomDeck(collections, decks, 'spanish-deck-standard')
    } as DeckData,
    [`deck-${uuid()}`]: {
      type: 'deck',
      deckRef: 'poker-deck',
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.7,
        offsetY: 0,
        offsetZ: 0.4
      },
      cards: randomDeck(collections, decks, 'poker-deck')

    } as DeckData,
    [`card-${uuid()}`]: {
      type: 'card',
      collectionRef: 'spanish-deck-collection',
      cardRef: 'coins-1',
      flip: true,
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.4,
        offsetY: 0,
        offsetZ: 0.8
      }
    } as CardData,
    [`card-${uuid()}`]: {
      type: 'card',
      collectionRef: 'english-deck-collection',
      cardRef: 'hearts-10',
      flip: false,
      position: {
        type: 'relative',
        ref: boardId,
        offsetX: 0.7,
        offsetY: 0,
        offsetZ: 0.8
      }
    } as CardData,
  }
});

export default game;
