import { times } from 'utils';
import { CardInstanceData } from 'data/Deck';

export function generate(num: number, start: number, prefix: string): CardInstanceData[] {
  return times(num).map((v) => ({
    id: `${prefix}-${start + v + 1}`,
    instances: 1
  }));
}
