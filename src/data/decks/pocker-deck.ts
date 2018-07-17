import Deck from 'data/Deck';
import { generate } from './utils';

const deck: Deck = {
  id: 'pocker-deck',
  collection: 'english-deck-collection',
  name: 'Standard 52 card poker deck',

  cards: [
    ...generate(13, 0, 'hearts'),
    ...generate(13, 0, 'diamonds'),
    ...generate(13, 0, 'clubs'),
    ...generate(13, 0, 'spades'),
  ]
};

export default deck;
