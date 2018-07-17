import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';

export default class BoxRenderer implements ObjectRenderer {

  private object3d: THREE.Object3D;

  public init(context: Context): void {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshStandardMaterial()
    );

    mesh.position.y += 0.2;
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    context.scene.add(this.object3d = mesh);
  }

  public update(): void {
    this.object3d.rotation.x += 0.01;
    this.object3d.rotation.y += 0.01;
    this.object3d.rotation.z += 0.01;
  }

}
