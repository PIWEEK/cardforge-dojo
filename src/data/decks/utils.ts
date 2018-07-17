import { CardInstanceData } from 'data/Deck';

function times(num): any[] {
  return [...Array(num).keys()];
}

export function generate(num: number, start: number, prefix: string): CardInstanceData[] {
  return times(num).map((v) => ({
    id: `${prefix}-${start + v + 1}`,
    instances: 1
  }));
}
