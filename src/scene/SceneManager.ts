import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import { Scene, Camera, WebGLRenderer } from 'three';

export interface SceneObject {
  init(context: Context): void;
  update(): void;
}

export interface Context {
  width: number;
  height: number;
  scene?: Scene;
  mainCamera?: Camera;

  showHelpers: boolean;
  shadowMapSize: { width: number, height: number };
  penumbra: number;
}

const contextDefaults = {
  showHelpers: false,
  shadowMapSize: {
    width: 1024,
    height: 1024
  },
  penumbra: 0.75
}

export default class SceneManager {
  private context: Context;
  private sceneObjects: SceneObject[];
  private renderer: WebGLRenderer;

  constructor(canvas: HTMLCanvasElement) {
    this.context = {
      width: window.innerWidth,
      height: window.innerHeight,
      ...contextDefaults
    };

    this.sceneObjects = [];
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

  public add(sceneObject: SceneObject): void {
    this.sceneObjects.push(sceneObject);
  }

  public start(): void {
    this.sceneObjects.forEach((obj: SceneObject) => obj.init(this.context));

    this.update();


    this.renderer.render(this.context.scene, this.context.mainCamera);
    requestAnimationFrame(this.update.bind(this));
  }

  public update(): void {
    requestAnimationFrame(this.update.bind(this));
    this.sceneObjects.forEach((obj) => obj.update());
    this.renderer.render(this.context.scene, this.context.mainCamera)
  }
}
