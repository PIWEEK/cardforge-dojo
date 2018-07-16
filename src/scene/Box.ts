import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Box implements SceneObject {

  private obj: THREE.Object3D;

  public init(context: Context): void {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshStandardMaterial()
    );

    mesh.position.y += 0.2;
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    context.scene.add(mesh);
    this.obj = mesh;
  }

  public update(): void {
    this.obj.rotation.x += 0.01;
    this.obj.rotation.y += 0.01;
    this.obj.rotation.z += 0.01;
  }

}
