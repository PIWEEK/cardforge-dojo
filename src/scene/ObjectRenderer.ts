import Context from './Context';

import { ObjectData } from 'data/Game';

export default interface ObjectRenderer {
  init(context: Context): void;
  change?(data: ObjectData, field: string): void
  render?(time: number): void;
  dispose(): void;
}
