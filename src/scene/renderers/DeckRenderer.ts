import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';
import SpriteInfo from 'scene/SpriteInfo';

import { buildCardObject } from 'scene/builders/CardObjectBuilder';
import { buildSelectionBox } from 'scene/builders/SelectionObjectBuilder';

const DECK_DEPTH: number = 0.2;

export default class DeckRenderer implements ObjectRenderer {
  private context: Context;
  private object3d: THREE.Object3D;
  private collisionBox: THREE.Object3D;

  public init(context: Context): void {
    this.context = context;

    const cardWidth = context.spriteData.width / context.spriteData.columns;
    const cardHeight = context.spriteData.height / context.spriteData.rows;
    const cardRatio = cardHeight / cardWidth;

    const width = context.cardDimension.size;
    const height = width * cardRatio;
    const depth = DECK_DEPTH * context.cardDimension.size;

    const radius = context.cardDimension.radius * context.cardDimension.size;

    const mesh = buildCardObject(
      width, height, depth, radius,
      context.spriteData,
      context.frontFace,
      context.spriteData,
      context.backFace
    );

    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.y = Math.PI;

    mesh.position.x = (-2.5 / 2.0) + width * 2;
    mesh.position.y = (depth / 2) + 0.02;
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    context.scene.add(this.object3d = mesh);

    const collisionBox = buildSelectionBox(width, height, depth, mesh);
    collisionBox.visible = false;
    context.scene.add(this.collisionBox = collisionBox);
  }

  public update(): void {
    const intersects = [];
    this.collisionBox.raycast(this.context.mouseRay, intersects);
    this.collisionBox.visible = (intersects.length > 0);
  }

}
