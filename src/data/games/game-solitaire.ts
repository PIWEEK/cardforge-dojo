import uuid from 'uuid/v4';
import Collection from 'data/Collection';
import Deck from 'data/Deck';
import { Game, GroundData, DeckData, CardData, BoardData } from 'data/Game';
import { randomDeck } from './utils';

const boardId: string = `board-${uuid()}`;

export const game = (collections: Collection[], decks: Deck[]) => {
  const deck = randomDeck(collections, decks, 'poker-deck');

  let cards = {};

  let offsetX = 0.0;
  let offsetY = 0.0;

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < i+1; j++) {
      const curCard = deck.pop();
      cards[`card-${uuid()}`] = {
        ...curCard,
        flip: j == i,
        position: {
          type: 'relative',
          ref: boardId,
          offsetX: 2.0 - offsetX,
          offsetY: 0.001 * (7 - i + 1),
          offsetZ: 1.0 - offsetY
        }
      };
      offsetX += 0.25;
    }
    offsetX = 0.0;
    offsetY += 0.1;
  }


  return {
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
        deckRef: 'poker-deck',
        position: {
          type: 'relative',
          ref: boardId,
          offsetX: 0.2,
          offsetY: 0,
          offsetZ: 0.4
        },
        cards: randomDeck(collections, decks, 'poker-deck')

      } as DeckData,
      ...cards
    }
  }
};

export default game;
