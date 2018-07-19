import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';
import config from 'scene/Config';
import { dispatch } from 'state';
import { MouseEntersCard, MouseExistsCard } from 'state/actions';

import { CardData, resolvePosition } from 'data/Game';
import { resolveCollection, resolveCard, cardMeasures } from 'data/Collection';

import { buildCardObject } from 'scene/builders/CardObjectBuilder';
import { buildSelectionBox } from 'scene/builders/SelectionObjectBuilder';

const STEP_SPEED = 300;
const ORDER_CONST = 0.0001;
const DRAG_HEIGHT = 0.15;

export default class CardRenderer implements ObjectRenderer {
  private context: Context;
  private object3d: THREE.Object3D;
  private collisionBox: THREE.Mesh;

  private isSelected: boolean = false;
  private mouseInside: boolean = false;
  private disableSelection: boolean = false;
  private dragging: boolean = false;
  private cardBaseline: number;

  constructor(private id: string) {
  }

  get state(): CardData {
    return this.context.game.objects[this.id] as CardData
  }

  public init(context: Context): void {
    this.context = context;

    const {collectionRef, cardRef, position} = this.state;

    const collection = resolveCollection(this.context.collections, collectionRef);
    const card = resolveCard(collection, cardRef);
    const { width, height, depth, radius } = cardMeasures(collection);

    const mesh = buildCardObject(
      width, height, depth, radius,
      collection, card
    );

    // Make the deck parallel to the Z plane
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.y = (<any>this.state).flip ? 0 : Math.PI;

    // Enable shadows
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    // Change position
    //mesh.position.x = (-2.5 / 2.0) + width * 2;
    this.cardBaseline = (depth / 2) + 0.02 + (<any>this.state).order * ORDER_CONST;
    mesh.position.y = this.cardBaseline + (<any>this.state).dragging ? DRAG_HEIGHT : 0;

    // Add to scene
    context.scene.add(this.object3d = mesh);

    // Box that will be displayed on hover
    const collisionBox = buildSelectionBox(width, height, depth, mesh);
    (<THREE.Material>collisionBox.material).visible = false;
    context.scene.add(this.collisionBox = collisionBox);
    context.collisionBoxes.push(collisionBox);

    const posVec = resolvePosition(
      this.context.game,
      position
    );
    posVec.y = this.cardBaseline;
    mesh.position.copy(posVec.add(new THREE.Vector3(
      width / 2, 0, height / 2)));
  }

  public render(): void {
    this.collisionBox.position.copy(this.object3d.position);
    this.collisionBox.rotation.copy(this.object3d.rotation);
    const intersects = this.context.mouseRay.intersectObjects(this.context.collisionBoxes);
    const isMouseInside = intersects.length > 0 &&
      intersects[0]['object'] === this.collisionBox;

    if (!this.dragging) {
      if (isMouseInside && !this.mouseInside && !(<any>this.context.game).dragging) {
        setTimeout(() => dispatch(new MouseEntersCard(this.id)), 10);
      } else if (!isMouseInside && this.mouseInside && !(<any>this.context.game).dragging) {
        dispatch(new MouseExistsCard(this.id));
      }
      this.mouseInside = isMouseInside;
    } else {
      (<THREE.Material>this.collisionBox.material).visible = false;
    }
  }

  public dispose(): void {
    this.context.scene.remove(this.object3d);
    this.context.collisionBoxes = this.context.collisionBoxes.filter((cb) => cb !== this.collisionBox);
    this.context.scene.remove(this.collisionBox);
  }

  public change(data, field: string): void {
    if (field === 'position' && data.position.type === 'absolute') {
      this.object3d.position.x = data.position.x;
      this.object3d.position.z = data.position.z;
    }

    if (field === 'selected') {
      this.isSelected = data.selected;
      (<THREE.Material>this.collisionBox.material).visible = data.selected && !this.disableSelection;
    }

    if (field === 'dragging') {
      if (data.dragging) {
        this.dragging = true;
        this.animateUp();
      } else {
        this.dragging = false;
        this.animateDown();
      }
      this.disableSelection = data.dragging;
    }

    if (field === 'flip') {
      if (data.flip) {
        this.animateFlip(0, data.dragging);
      } else {
        this.animateFlip(Math.PI, data.dragging);
      }
    }

    if (field === 'order') {
      const {collectionRef, cardRef} = data;
      const collection = resolveCollection(this.context.collections, collectionRef);
      const card = resolveCard(collection, cardRef);
      const { width, height, depth, radius } = cardMeasures(collection);
      this.cardBaseline = (depth / 2) + 0.02 + (<any>data).order * ORDER_CONST;
    }
  }

  private animateFlip(targetAngle: number, dragging: boolean) {
    const rotate = new TWEEN.Tween(this.object3d.rotation).to({
      y: targetAngle
    }, STEP_SPEED);
    const goUp = new TWEEN.Tween(this.object3d.position).to({
      y: this.cardBaseline + DRAG_HEIGHT
    }, STEP_SPEED);
    const goDown = new TWEEN.Tween(this.object3d.position).to({
      y: this.cardBaseline
    }, STEP_SPEED);

    rotate.start();
    goUp.onStart(() => {
      (<THREE.Material>this.collisionBox.material).visible = false;
      this.disableSelection = true
    });
    goDown.onComplete(() => {
      (<THREE.Material>this.collisionBox.material).visible = this.isSelected;
      this.disableSelection = false;
    })

    if (dragging) {
      rotate.start();
    } else {
      goUp.chain(goDown).start()
    }
  }

  private animateUp() {
    new TWEEN.Tween(this.object3d.position).to({
      y: this.cardBaseline + DRAG_HEIGHT
    }, STEP_SPEED).start();
  }

  private animateDown() {
    new TWEEN.Tween(this.object3d.position).to({
      y: this.cardBaseline
    }, STEP_SPEED).start();
  }

}
