import Deck from 'data/Deck';
import { generate } from './utils';

const deck: Deck = {
  id: 'spanish-deck-standard',
  collection: 'spanish-deck-collection',
  name: 'Standard 40 card deck',

  cards: [
    ...generate(7, 0, 'coins'),
    ...generate(3, 9, 'coins'),
    ...generate(7, 0, 'cups'),
    ...generate(3, 9, 'cups'),
    ...generate(7, 0, 'swords'),
    ...generate(3, 9, 'swords'),
    ...generate(7, 0, 'clubs'),
    ...generate(3, 9, 'clubs'),
  ]
};

export default deck;
