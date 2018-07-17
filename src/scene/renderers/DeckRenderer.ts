import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';
import SpriteInfo from 'scene/SpriteInfo';

import { buildCardObject } from 'scene/builders/CardObjectBuilder';
import { buildSelectionBox } from 'scene/builders/SelectionObjectBuilder';

const DECK_DEPTH: number = 0.2;

export default class DeckRenderer implements ObjectRenderer {

  private object3d: THREE.Object3D;

  public init(context: Context): void {
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

    //const glow = buildSelectionBox(width, height, depth, mesh);
    //context.scene.add(glow);
  }

  public update(): void {
    //this.object3d.position.y = 0.5;
    //this.object3d.rotation.x += 0.01;
    //this.object3d.rotation.y += 0.01;
    //this.object3d.rotation.z += 0.01;
  }

}
