import Deck from 'data/Deck';
import { generate } from './utils';

const deck: Deck = {
  id: 'spanish-deck-extended',
  collection: 'spanish-deck-collection',
  name: 'Standard 48 card deck',

  cards: [
    ...generate(12, 0, 'coins'),
    ...generate(12, 0, 'cups'),
    ...generate(12, 0, 'swords'),
    ...generate(12, 0, 'clubs'),
  ]
};

export default deck;
