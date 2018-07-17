import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';
import SpriteInfo from 'scene/SpriteInfo';

const CARD_DEPTH: number = 0.005;

export default class CardRenderer implements ObjectRenderer {

  private object3d: THREE.Object3D;

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
    info: SpriteInfo, faceWidth: number, faceHeight: number,
    row: number, column: number
  ): THREE.Texture {
    const spriteWidth = info.width;
    const spriteHeight = info.height;
    const spriteCols = info.columns;
    const spriteRows = info.rows;

    const texture = new THREE.TextureLoader().load(info.url);
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
    const cardWidth = context.spriteData.width / context.spriteData.columns;
    const cardHeight = context.spriteData.height / context.spriteData.rows;
    const cardRatio = cardHeight / cardWidth;
    const width = context.cardDimension.size;
    const height = width * cardRatio;

    const depth = CARD_DEPTH * context.cardDimension.size;
    const radius = context.cardDimension.radius * context.cardDimension.size;
    const shape = this.roundedRectShape(width, height, radius);

    const extrudeSettings = {
      amount: depth,
      bevelEnabled: false
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.translate(-(width / 2), -(height / 2), -(depth / 2));
    geometry.computeFaceNormals();

    // Doesn't work, should smooth the edges on the rounded corner
    // geometry.mergeVertices();
    // geometry.computeVertexNormals();

    geometry.faces.forEach((f) => f.materialIndex = 0);

    geometry.faces
      .filter((f) => Math.abs(f.normal.z - 1.0) < 0.001)
      .forEach((f) => f.materialIndex = 1);

    geometry.faces
      .filter((f) => Math.abs(f.normal.z + 1.0) < 0.001)
      .forEach((f) => f.materialIndex = 2);

    const [backRow, backCol] = context.spriteData.backface;

    const mesh = new THREE.Mesh(
      new THREE.BufferGeometry().fromGeometry(geometry),
      [
        new THREE.MeshStandardMaterial({
          color: 0xFFFFFF
        }),
        new THREE.MeshStandardMaterial({
          map: this.loadCardTexture(
            context.spriteData, width, height, 0, 0)
        }),
        new THREE.MeshStandardMaterial({
          map: this.loadCardTexture(
            context.spriteData, width, height, backRow, backCol)
        })
      ]
    );

    mesh.rotation.x = -Math.PI / 2;
    mesh.position.y = (depth / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    context.scene.add(this.object3d = mesh);
  }

  public update(): void {
    this.object3d.position.y = 0.5;
    //this.object3d.rotation.x += 0.01;
    this.object3d.rotation.y += 0.01;
    //this.object3d.rotation.z += 0.01;
  }

}
