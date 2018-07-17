import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';

export default class BoardRenderer implements ObjectRenderer {

  private object3d: THREE.Object3D;

  private createTexture(): THREE.Texture {
    const texture = new THREE.TextureLoader().load(require('assets/textures/fabric-blue.png'));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    texture.repeat.x = 3;
    texture.repeat.y = 3;
    return texture;
  }

  public init(context: Context): void {
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 1.5, 0.02),
      new THREE.MeshStandardMaterial({
        color: 0x0000cc,
        roughness: 1.0,
        metalness: 0.0,
        map: this.createTexture()
      })
    );

    mesh.position.y = 0.01;
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    context.scene.add(this.object3d = mesh);
  }

  public update(): void {
  }

}
