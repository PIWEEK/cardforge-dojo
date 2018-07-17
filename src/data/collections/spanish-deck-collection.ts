import { createCollection, calculatePosition } from './utils';

export default {
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
    ...createCollection('coins', 'Oros', 12, 'spanish-deck', calculatePosition(0, 10)),
    ...createCollection('cups', 'Copas', 12, 'spanish-deck', calculatePosition(12, 10)),
    ...createCollection('swords', 'Espadas', 12, 'spanish-deck', calculatePosition(24, 10)),
    ...createCollection('clubs', 'Bastos', 12, 'spanish-deck', calculatePosition(36, 10)),
  ]
}
