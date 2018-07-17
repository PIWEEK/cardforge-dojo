export interface SpriteData {
  id: string;
  url: string;
  width: number;
  height: number;
  columns: number;
  rows: number;
}

export interface SpriteCoord {
  sprite: string;
  position: [ number, number ];
}

export interface CardData {
  id: string;
  name: string;
  front: SpriteCoord | string;
}

export interface Collection {
  id: string;
  name: string;
  sprites: SpriteData[];
  back: SpriteCoord | string;
  cards: CardData[];
}

export default Collection;
