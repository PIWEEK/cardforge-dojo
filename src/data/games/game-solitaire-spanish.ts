import uuid from 'uuid/v4';
import Collection from 'data/Collection';
import Deck from 'data/Deck';
import { Game, GroundData, DeckData, CardData, BoardData } from 'data/Game';
import { randomDeck } from './utils';

const boardId: string = `board-${uuid()}`;

let order = 0;

export const game = (collections: Collection[], decks: Deck[]) => {
  const deck = randomDeck(collections, decks, 'spanish-deck-extended');

  let cards = {};

  let offsetX = 0.0;
  let offsetY = 0.0;

  for (let i = 6; i >= 0; i--) {
    for (let j = 0; j < i+1; j++) {
      const curCard = deck.pop();
      cards[`card-${uuid()}`] = {
        ...curCard,
        flip: j == i,
        order: order++,
        position: {
          type: 'relative',
          ref: boardId,
          offsetX: 2.0 - offsetX,
          offsetY: (order++) * 0.00001,
          offsetZ: 0.2 + offsetY
        }
      };
      offsetX += 0.25;
    }
    offsetX = 0.0;
    offsetY += 0.1;
  }


  return {
    order,
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
        deckRef: 'spanish-deck-extended',
        position: {
          type: 'relative',
          ref: boardId,
          offsetX: 0.2,
          offsetY: 0,
          offsetZ: 0.4
        },
        cards: deck

      } as DeckData,
      ...cards
    }
  }
};

export default game;
