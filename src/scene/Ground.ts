import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Ground implements SceneObject {

  public obj: THREE.Object3D;

  public init(context: Context): void {
    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(100, 100, 100, 100),
      new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        metalness: 0.0,
        roughness: 1.0,
        color: 0x808080,
        dithering: true,
        wireframe: false
      })
    );

    mesh.rotation.x = -(Math.PI / 2);
    mesh.receiveShadow = true;

    this.obj = mesh;
    context.scene.add(mesh);
  }

  public update(): void {
  }

}
