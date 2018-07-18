export default Game;

import { Vector3 } from 'three';
import config from 'scene/Config';

export type ObjectData = GroundData | BoardData | DeckData | CardData;
export type Position = AbsolutePosition | RelativePosition | RelativeGridPosition;

export enum PositionType { absolute, relative, relativeGrid };

export interface AbsolutePosition {
  type: 'absolute';
  x: number
  y: number;
  z: number;
}

export interface RelativePosition {
  type: 'relative';
  ref: string;
  offsetX: number;
  offsetY: number;
  offsetZ: number;
}

export interface RelativeGridPosition {
  type: 'relativeGrid';
  ref: string;
  row: number;
  column: number;
}

export interface Game {
  objects: { [objectId: string]: ObjectData }
}

export interface GroundData {
  type: 'ground'
  background: string;
}

export enum ObjectDataType { board, deck, card }

export interface BoardData {
  type: 'board';
  background: string;
  width: number;
  height: number;
  depth: number;
  offsetX?: number;
  offsetY?: number;
}

export interface DeckData {
  type: 'deck';
  deckRef: string;
  position: Position
}

export interface CardData {
  type: 'card';
  collectionRef: string;
  cardRef: string;
  position: Position
}

export function resolvePosition(game: Game, position: Position): Vector3 {
  if (position.type === 'absolute') {
    return new Vector3(position.x, position.y, position.z);
  } else {
    // Only allow at the moment board as relative
    const ref: BoardData = (<BoardData>game.objects[position.ref]);

    if (position.type === 'relative') {
      return new Vector3(
        -(ref.width / 2) + position.offsetX,
        ref.depth + position.offsetY,
        -(ref.height / 2) + position.offsetZ
      );
    } else {
      return new Vector3(
        (-ref.width / 2) + position.column * config.dimensions.grid,
        ref.depth,
        (-ref.height / 2) + position.row * config.dimensions.grid
      );
    }
  }


}
