import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';

export default class GroundRenderer implements ObjectRenderer {

  public context: Context;
  public object3d: THREE.Object3D;

  private loadTexture1(): THREE.Texture {
    const texture = new THREE.TextureLoader().load(require('assets/textures/tatami-light.jpg'));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    texture.repeat.x = 100;
    texture.repeat.y = 150;
    return texture;
  }

  private loadTexture2(): THREE.Texture {
    const texture = new THREE.TextureLoader().load(require('assets/textures/bamboo-wicker.jpg'));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    texture.repeat.x = 80;
    texture.repeat.y = 80;
    return texture;
  }

  private loadTexture3(): THREE.Texture {
    const texture = new THREE.TextureLoader().load(require('assets/textures/gray-paper.jpg'));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    texture.repeat.x = 80;
    texture.repeat.y = 80;
    return texture;
  }

  private loadTexture4(): THREE.Texture {
    const texture = new THREE.TextureLoader().load(require('assets/textures/rattan-wicker.jpg'));
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    texture.repeat.x = 80;
    texture.repeat.y = 80;
    return texture;
  }

  public init(context: Context): void {
    this.context = context;

    const mesh = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(100, 100, 100, 100),
      new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide,
        metalness: 0.0,
        roughness: 1.0,
        color: 0x808080,
        dithering: true,
        wireframe: false,
        map: this.loadTexture4()
      })
    );

    mesh.rotation.x = -(Math.PI / 2);
    mesh.receiveShadow = true;

    context.scene.add(this.object3d = mesh);
  }

  public dispose(): void {
    this.context.scene.remove(this.object3d);
  }

}
