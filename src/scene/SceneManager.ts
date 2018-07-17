import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';

import Deck from 'data/Deck';
import Collection from 'data/Collection';

import Context from './Context';
import ObjectRenderer from './ObjectRenderer';

const contextDefaults: Context = {
  width: 1,
  height: 1,
  showHelpers: false,
  shadowMapSize: {
    width: 1024,
    height: 1024
  },
  penumbra: 0.75,

  // spanish
  // spriteData: {
  //   url: require('assets/img/spanish_deck.png'),
  //   width: 2496,
  //   height: 1595,
  //   columns: 12,
  //   rows: 5
  // },
  //
  // frontFace: [ 0, 0 ],
  // backFace: [ 4, 1 ],

  // english
  spriteData: {
    url: require('assets/img/english_deck.png'),
    width: 3410,
    height: 3584,
    columns: 10,
    rows: 7
  },

  frontFace: [ 0, 0 ],
  backFace: [ 5, 2 ],

  cardDimension: {
    size: 0.2,
    radius: 0.1
  }
};

export default class SceneManager {
  private context: Context;
  private objectRenderers: ObjectRenderer[];
  private renderer: THREE.WebGLRenderer;

  constructor(canvas: HTMLCanvasElement) {
    this.context = {
      ...contextDefaults,
      width: window.innerWidth,
      height: window.innerHeight,
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
  }

  public add(renderer: ObjectRenderer): void {
    this.objectRenderers.push(renderer);
  }

  public start(): void {
    this.objectRenderers.forEach(
      (renderer) => renderer.init(this.context));

    this.update();

    this.renderer.render(this.context.scene, this.context.mainCamera);
    requestAnimationFrame(this.update.bind(this));
  }

  public update(): void {
    requestAnimationFrame(this.update.bind(this));
    this.objectRenderers.forEach((obj) => obj.update());
    this.renderer.render(this.context.scene, this.context.mainCamera)
  }

  public loadCollections(collections: Collection[]): void {
  }

  public loadDecks(decks: Deck[]): void {
  }

  public loadGame(game: any): void {
  }

}
