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

export default Deck;
