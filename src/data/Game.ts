
type ObjectData = BoardData | DeckData | CardData;
type Position = AbsolutePosition | RelativePosition | RelativeGridPosition;

enum PositionType { absolute, relative, relativeGrid };

interface AbsolutePosition {
  type: 'absolute';
  x: number
  y: number;
  z: number;
}

interface RelativePosition {
  type: 'relative';
  ref: string;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
}

interface RelativeGridPosition {
  type: 'relativeGrid';
  ref: string;
  row: number;
  column: number;
}

export interface Game {
  ground?: GroundData,
  objects: ObjectData[]
}

interface GroundData {
  background: string;
}

enum ObjectDataType { board, deck, card }

interface BoardData {
  type: 'board';
  id: string;
  background: string;
  width: number;
  height: number;
  depth: number;
  offsetX?: number;
  offsetY?: number;
}

interface DeckData {
  type: 'deck';
  id: string;
  deckRef: string;
  position: Position
}

interface CardData {
  type: 'card';
  id: string;
  collectionRef: string;
  cardRef: string;
  position: Position
}

export default Game;
