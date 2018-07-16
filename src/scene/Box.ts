import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Box implements SceneObject {

  private obj: THREE.Object3D;

  public init(context: Context): void {
    this.obj = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshNormalMaterial()
    );

    this.obj.position.y += 0.2;

    context.scene.add(this.obj);
  }

  public update(): void {
    this.obj.rotation.x += 0.01;
    this.obj.rotation.y += 0.01;
    this.obj.rotation.z += 0.01;
  }

}
