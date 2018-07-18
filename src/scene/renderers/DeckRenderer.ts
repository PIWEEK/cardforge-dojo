import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';
import config from 'scene/Config';

import { DeckData, resolvePosition } from 'data/Game';
import { resolveDeck } from 'data/Deck';
import { resolveCollection, deckMeasures } from 'data/Collection';

import { buildCardObject } from 'scene/builders/CardObjectBuilder';
import { buildSelectionBox } from 'scene/builders/SelectionObjectBuilder';

export default class DeckRenderer implements ObjectRenderer {
  private context: Context;
  private object3d: THREE.Object3D;
  private collisionBox: THREE.Object3D;

  constructor(private id: string) {
  }

  public init(context: Context): void {
    this.context = context;

    const {deckRef, position} = this.context.game.objects[this.id] as DeckData;

    const deck = resolveDeck(this.context.decks, deckRef);
    const collection = resolveCollection(this.context.collections, deck.collection);
    const { width, height, depth, radius } = deckMeasures(collection);

    const mesh = buildCardObject(
      width, height, depth, radius,
      collection,
      collection.cards[0] // Card displayed on the bottom
    );

    // Make the deck parallel to the Z plane
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.y = Math.PI;

    // Enable shadows
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    // Change position
    //mesh.position.x = (-2.5 / 2.0) + width * 2;
    mesh.position.y = (depth / 2) + 0.02;

    // Add to scene
    context.scene.add(this.object3d = mesh);

    // Box that will be displayed on hover
    const collisionBox = buildSelectionBox(width, height, depth, mesh);
    collisionBox.visible = false;
    context.scene.add(this.collisionBox = collisionBox);

    const posVec = resolvePosition(
      this.context.game,
      position
    );
    mesh.position.copy(posVec.add(new THREE.Vector3(
      width / 2, depth / 2, height / 2)));
  }

  public render(): void {
    const intersects = [];
    this.collisionBox.position.copy(this.object3d.position);
    this.collisionBox.raycast(this.context.mouseRay, intersects);
    this.collisionBox.visible = (intersects.length > 0);
  }

  public dispose(): void {
    this.context.scene.remove(this.object3d);
    this.context.scene.remove(this.collisionBox);
  }

}
