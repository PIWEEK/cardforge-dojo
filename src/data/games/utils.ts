import { CardData } from 'data/Game';
import { Collection, resolveCollection} from 'data/Collection';
import { Deck, resolveDeck, materializeDeck } from 'data/Deck';
import { shuffle } from 'utils';

export function randomDeck(
  collections: Collection[],
  decks: Deck[],
  deckRef: string
): CardData[] {
  const deck: Deck = resolveDeck(decks, deckRef);
  const collectionRef: string = deck.collection;
  const collection: Collection = resolveCollection(collections, collectionRef);

  return shuffle(
    materializeDeck(collection, deck)
      .map((data) => ({
        type: 'card',
        collectionRef: collectionRef,
        cardRef: data.id
      })));
}
