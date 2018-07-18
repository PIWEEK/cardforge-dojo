import { CardData } from 'data/Collection';

function times(num) {
  return [...Array(num).keys()];
}

export function createCollection(
  suitId: string,
  suitName: string,
  numItems: number,
  spriteId: string,
  position: (number) => [ number, number ]
): CardData[] {
  return times(numItems).map((v) => ({
    id: `${suitId}-${ v + 1 }`,
    name: `${suitName} (${ v + 1 })`,
    front: {
      sprite: spriteId,
      position: position(v),
    }
  }));
}

export function calculatePosition(start: number, columns: number): (number) => [number, number] {
  return (v) => {
    const row = Math.floor((start + v) / columns);
    const col = (start + v) - (row * columns)
    return [ row, col ]
  };
}
