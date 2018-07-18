import * as THREE from 'three';

import Collection from 'data/Collection';
import Deck from 'data/Deck';
import Game from 'data/Game';

export default interface Context {
  width: number;
  height: number;
  scene?: THREE.Scene;
  mainCamera?: THREE.Camera;
  mouseRay: THREE.Raycaster;

  collections?: Collection[];
  decks?: Deck[];
  game: Game;
}
