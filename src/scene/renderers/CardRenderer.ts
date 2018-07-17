import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';
import SpriteInfo from 'scene/SpriteInfo';

import { buildCardObject } from 'scene/builders/CardObjectBuilder';
import { buildSelectionBox } from 'scene/builders/SelectionObjectBuilder';

const CARD_DEPTH: number = 0.005;

const testCards = [[0, 0], [1, 0], [2, 0], [3, 0]];

export default class CardRenderer implements ObjectRenderer {
  private context: Context;
  private cardObjects: THREE.Object3D[] = [];
  private collisionBoxes: THREE.Object3D[] = [];

  public init(context: Context): void {
    this.context = context;

    const cardWidth = context.spriteData.width / context.spriteData.columns;
    const cardHeight = context.spriteData.height / context.spriteData.rows;
    const cardRatio = cardHeight / cardWidth;

    const width = context.cardDimension.size;
    const height = width * cardRatio;
    const depth = CARD_DEPTH * context.cardDimension.size;

    const radius = context.cardDimension.radius * context.cardDimension.size;

    let position = (-2.5 / 2.0) + width * 4;

    testCards.forEach((faceCoord: [number, number]) => {
      const mesh = buildCardObject(
        width, height, depth, radius,
        context.spriteData,
        faceCoord,
        context.spriteData,
        context.backFace
      );

      mesh.rotation.x = -Math.PI / 2;
      mesh.position.y = (depth / 2) + 0.02;
      mesh.position.x = position;

      position += width + 0.1;

      mesh.castShadow = true;
      mesh.receiveShadow = false;

      this.cardObjects.push(mesh);

      context.scene.add(mesh);

      const collisionBox =  buildSelectionBox(width, height, depth, mesh);
      collisionBox.visible = false;
      this.collisionBoxes.push(collisionBox);
      context.scene.add(collisionBox);
    });

  }

  public update(): void {
    this.collisionBoxes.forEach((collisionBox) => {
      const intersects = [];
      collisionBox.raycast(this.context.mouseRay, intersects);
      collisionBox.visible = (intersects.length > 0);
    });
  }

}
