export default Deck;

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
