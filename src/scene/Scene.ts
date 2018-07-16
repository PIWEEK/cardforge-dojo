import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Scene implements SceneObject {

  public init(context: Context): void {
    const scene = new THREE.Scene();
    context.scene = scene;
  }

  public update(): void {
  }
}
