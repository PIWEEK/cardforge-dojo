import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

import uuid from 'uuid/v4';
import diff from 'deep-diff';
import TWEEN from '@tweenjs/tween.js';

import { dispatch } from 'state';
import { MouseDown, MouseUp } from 'state/actions';

import Deck from 'data/Deck';
import Collection from 'data/Collection';
import Game from 'data/Game';

import Context from './Context';
import ObjectRenderer from './ObjectRenderer';

export default class SceneManager {
  private context: Context;
  private renderer: THREE.WebGLRenderer;
  private mouse: THREE.Vector2;

  private rendererRegistry: Map<string, (string?) => ObjectRenderer> = new Map();
  private objectRenderers: Map<string, ObjectRenderer> = new Map();

  constructor(canvas: HTMLCanvasElement) {
    this.context = {
      width: window.innerWidth,
      height: window.innerHeight,
      mouseRay:  new THREE.Raycaster(),
      collisionBoxes: [],
      game: {
        objects: {}
      }
    };
    this.setupRenderer(canvas);
  }

  private setupRenderer(canvas: HTMLCanvasElement): void {
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });

    this.renderer.setSize(this.context.width, this.context.height);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.gammaInput = true;
    this.renderer.gammaOutput = true;

    canvas.onmousemove = (event) => {
      if (!this.mouse) {
         this.mouse = new THREE.Vector2()
      }
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    canvas.onmousedown = (event) => {
      dispatch(new MouseDown(event.button));
    }

    canvas.onmouseup = (event) => {
      dispatch(new MouseUp(event.button));
    }

    window.addEventListener('resize', (event) => {
      (<any>this.context.mainCamera).aspect = window.innerWidth / window.innerHeight;
      (<any>this.context.mainCamera).updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.context.mouseRay.setFromCamera(this.mouse, this.context.mainCamera);
    }, false);

  }

  public registerGlobal(renderer: ObjectRenderer): void {
    this.objectRenderers.set(uuid(), renderer);
  }

  public register(objectType: string, rendererFn: (string?) => ObjectRenderer): void {
    this.rendererRegistry.set(objectType, rendererFn);
  }

  public start(): void {
    this.objectRenderers.forEach(
      (renderer) => renderer.init(this.context));
    this.renderFrame(0);
    requestAnimationFrame(this.renderFrame.bind(this));
  }

  public renderFrame(time: number): void {
    if (this.mouse) {
      this.context.mouseRay.setFromCamera(this.mouse, this.context.mainCamera);
    }
    this.objectRenderers.forEach((obj) => obj.render && obj.render(time));
    this.renderer.render(this.context.scene, this.context.mainCamera);
    TWEEN.update(time);
    requestAnimationFrame(this.renderFrame.bind(this));
  }

  public loadCollections(collections: Collection[]): void {
    this.context.collections = collections;
  }

  public loadDecks(decks: Deck[]): void {
    this.context.decks = decks;
  }

  public update(game: Game): void {
    const gameDiff = diff(this.context.game.objects, game.objects);

    if (!gameDiff) {
      return;
    }

    this.context.game = game;

    gameDiff
      .filter(({ kind }) => kind === 'N')
      .filter(({ path }) => path.length === 1)
      .forEach(({ path: [objectId], rhs: objectData }) => {
        const rendererFn = this.rendererRegistry.get(objectData.type)
        const renderer = rendererFn(objectId);
        renderer.init(this.context);
        this.objectRenderers.set(objectId, renderer);
      });

    gameDiff
      .filter(({ kind }) => kind === 'D')
      .filter(({ path }) => path.length === 1)
      .forEach(({ path: [objectId]}) => {
        const objRenderer = this.objectRenderers.get(objectId);
        this.objectRenderers.delete(objectId);
        objRenderer && objRenderer.dispose();
      });

    gameDiff
      .filter(({ kind, path }) => kind === 'E' || (kind === 'N' && path.length > 1))
      .forEach(({ path: [objectId, field], rhs: data }) => {
        const objState = game.objects[objectId];
        const objRenderer = this.objectRenderers.get(objectId);
        objRenderer && objRenderer.change && objRenderer.change(objState, field);
      });

  }

}
