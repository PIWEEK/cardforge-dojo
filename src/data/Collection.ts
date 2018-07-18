export default Collection;

import config from 'scene/Config';

type Coordinate = [ number, number ];
type URL = string;

export interface SpriteData {
  id: string;
  url: string;
  columns: number;
  rows: number;
}

export interface SpriteCoord {
  sprite: string;
  position: Coordinate;
}

export interface CardData {
  id: string;
  name: string;
  front: SpriteCoord | URL;
}

export interface Collection {
  id: string;
  name: string;
  width: number;
  height: number;
  radius: number;
  sprites: SpriteData[];
  back: SpriteCoord | URL;
  cards: CardData[];
}

export function resolveCollection(collections: Collection[], collectionRef: string): Collection {
  return collections.find((col) => col.id === collectionRef);
}

export function resolveCard(collection: Collection, cardRef: string): CardData {
  return collection.cards.find((card) => card.id === cardRef);
}

export function cardMeasures(collection: Collection): { width: number, height: number, depth: number, radius: number } {
  const ratio = (collection.height / collection.width);

  return {
    width:  config.dimensions.card,
    height: config.dimensions.card * ratio,
    depth:  config.dimensions.card * config.dimensions.cardDepth,
    radius: config.dimensions.card * collection.radius
  }
}

export function deckMeasures(collection: Collection): { width: number, height: number, depth: number, radius: number } {
  const { width, height, radius } = cardMeasures(collection);

  return {
    width,
    height,
    radius: radius,
    depth: config.dimensions.card * config.dimensions.deckDepth,
  }
}

export function resolveSprite(collection: Collection, spriteCoord: SpriteCoord): SpriteData {
  return collection.sprites.find((s) => s.id === spriteCoord.sprite);
}
