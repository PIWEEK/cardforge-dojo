export default Deck;
import { times, flatMap } from 'utils';
import { Collection, CardData, resolveCard } from 'data/Collection';

export interface CardInstanceData {
  id: string;
  instances: number;
}

export interface Deck {
  id: string;
  collection: string;
  name: string;
  cards: CardInstanceData[]
}

export function resolveDeck(decks: Deck[], deckRef: string): Deck {
  return decks.find((deck) => deck.id === deckRef);
}

export function materializeDeck(collection: Collection, deck: Deck): CardData[] {
  const resolveCardFn = (cardId) => resolveCard.bind(null, collection, cardId);
  return flatMap(
    deck.cards,
    ({id, instances}) => times(instances).map(resolveCardFn(id)));
}
