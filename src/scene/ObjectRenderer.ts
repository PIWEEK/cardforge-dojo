import Context from './Context';

export default interface ObjectRenderer {
  init(context: Context): void;
  update(): void;
}
