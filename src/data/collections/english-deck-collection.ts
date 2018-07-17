import Collection from 'data/Collection';
import { createCollection, calculatePosition } from './utils';

const collection: Collection = {
  id: 'english-deck-collection',
  name: 'English Deck Collection',

  sprites: [{
    id: 'english-deck',
    url: require('assets/img/english_deck.png'),
    width: 3410,
    height: 3584,
    columns: 10,
    rows: 6
  }],

  back: {
    sprite: 'english-deck',
    position: [ 5, 2 ]
  },

  cards: [
    ...createCollection('hearts', 'Hearts', 13, 'english-deck', calculatePosition(0, 10)),
    ...createCollection('diamonds', 'Diamonds', 13, 'english-deck', calculatePosition(13, 10)),
    ...createCollection('clubs', 'Clubs', 13, 'english-deck', calculatePosition(26, 10)),
    ...createCollection('spades', 'Spades', 13, 'english-deck', calculatePosition(39, 10)),
  ]
}

export default collection;
