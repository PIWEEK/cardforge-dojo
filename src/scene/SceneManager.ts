import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

import Deck from 'data/Deck';
import Collection from 'data/Collection';
import Game from 'data/Game';

import Context from './Context';
import ObjectRenderer from './ObjectRenderer';

export default class SceneManager {
  private context: Context;
  private objectRenderers: ObjectRenderer[];
  private renderer: THREE.WebGLRenderer;
  private mouse: THREE.Vector2 = new THREE.Vector2();

  constructor(canvas: HTMLCanvasElement) {
    this.context = {
      width: window.innerWidth,
      height: window.innerHeight,
      mouseRay:  new THREE.Raycaster(),
      game: {
        objects: []
      }
    };

    this.objectRenderers = [];
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
      this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
  }

  public add(renderer: ObjectRenderer): void {
    this.objectRenderers.push(renderer);
  }

  public start(): void {
    this.objectRenderers.forEach(
      (renderer) => renderer.init(this.context));
    requestAnimationFrame(this.update.bind(this));
  }

  public update(game: Game): void {
  }

  public renderFrame(time: number): void {
    this.context.mouseRay.setFromCamera(this.mouse, this.context.mainCamera);
    this.objectRenderers.forEach((obj) => obj.update());
    this.renderer.render(this.context.scene, this.context.mainCamera);
    requestAnimationFrame(this.renderFrame.bind(this));
  }

  public loadCollections(collections: Collection[]): void {
    this.context.collections = collections;
  }

  public loadDecks(decks: Deck[]): void {
    this.context.decks = decks;
  }

}
