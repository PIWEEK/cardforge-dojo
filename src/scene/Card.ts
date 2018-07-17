import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Card implements SceneObject {

  private obj: THREE.Object3D;

  private roundedRectShape(width, height, radius) {
    var shape = new THREE.Shape();
    shape.moveTo(0, radius);
    shape.lineTo(0, height - radius);
    shape.quadraticCurveTo(0, height, radius, height);
    shape.lineTo(width - radius, height);
    shape.quadraticCurveTo(width, height, width, height - radius);
    shape.lineTo(width, radius);
    shape.quadraticCurveTo(width, 0, width - radius, 0);
    shape.lineTo(radius, 0);
    shape.quadraticCurveTo(0, 0, 0, radius);
    return shape;
  }

  private loadCardTexture(
    spriteWidth: number,
    spriteHeight: number,
    spriteCols: number,
    spriteRows: number,
    faceWidth: number,
    faceHeight: number,
    row: number,
    column: number
  ): THREE.Texture {
    const texture = new THREE.TextureLoader().load(require('assets/img/spanish_deck.png'));
    texture.anisotropy = 4;

    const offsetX = (1 / spriteWidth) * (spriteWidth / spriteCols)
    texture.offset.x = offsetX * column;
    texture.repeat.x = (1 / faceWidth) / spriteCols;

    const offsetY = (1 / spriteHeight) * (spriteHeight / spriteRows)
    texture.offset.y = 1.0 - (offsetY * (row + 1));
    texture.repeat.y = (1 / faceHeight) / spriteRows;

    return texture;
  }

  public init(context: Context): void {
    const { width, height, depth, radius } = context.cardDimension;
    const shape = this.roundedRectShape(width, height, radius);

    const extrudeSettings = {
      amount: depth,
      bevelEnabled: false
    };

    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, extrudeSettings),
      new THREE.MeshStandardMaterial({
        map: this.loadCardTexture(2496, 1595, 12, 5, width, height, 0, 0)
      })
    );

    mesh.geometry.translate(-(width / 2), -(height / 2), -(depth / 2));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = (depth / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    (<any>window).card = mesh;

    mesh.position.y = 0.5;

    context.scene.add(mesh);
    this.obj = mesh;
  }

  public update(): void {
    //this.obj.rotation.x += 0.01;
    this.obj.rotation.y += 0.01;
    //this.obj.rotation.z += 0.01;
  }

}
