import * as THREE from 'three';
import SpriteInfo from './SpriteInfo';

export default interface Context {
  width: number;
  height: number;
  scene?: THREE.Scene;
  mainCamera?: THREE.Camera;

  showHelpers: boolean;
  shadowMapSize: {
    width: number,
    height: number
  };

  penumbra: number;

  spriteData: SpriteInfo;

  cardDimension: {
    size: number,
    radius: number
  };
}
