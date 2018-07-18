import Collection from 'data/Collection';
import { createCollection, calculatePosition } from './utils';

const collection: Collection = {
  id: 'spanish-deck-collection',
  name: 'Spanish deck',
  width: 208,
  height: 319,
  radius: 0.1,

  sprites: [{
    id: 'spanish-deck',
    url: require('assets/img/spanish_deck.png'),
    columns: 12,
    rows: 5
  }],

  back: {
    sprite: 'spanish-deck',
    position: [ 4, 1 ]
  },

  cards: [
    ...createCollection('coins', 'Oros', 12, 'spanish-deck', calculatePosition(0, 12)),
    ...createCollection('cups', 'Copas', 12, 'spanish-deck', calculatePosition(12, 12)),
    ...createCollection('swords', 'Espadas', 12, 'spanish-deck', calculatePosition(24, 12)),
    ...createCollection('clubs', 'Bastos', 12, 'spanish-deck', calculatePosition(36, 12)),
  ]
}

export default collection;
