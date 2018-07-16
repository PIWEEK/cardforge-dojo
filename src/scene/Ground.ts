import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Ground implements SceneObject {

  public obj: THREE.Object3D;

  public init(context: Context): void {
    this.obj = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3, 10),
      new THREE.MeshNormalMaterial()
    );

    this.obj.rotation.x = -Math.PI / 2;
    context.scene.add(this.obj);
  }

  public update(): void {
  }

}
