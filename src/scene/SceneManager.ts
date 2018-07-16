import * as THREE from 'three';
import 'three/examples/js/controls/OrbitControls';
import { Scene, Camera, Renderer } from 'three';

export interface SceneObject {
  init(context: Context): void;
  update(): void;
}

export interface Context {
  width: number;
  height: number;
  scene?: Scene;
  mainCamera?: Camera;
}

export default class SceneManager {
  private context: Context;
  private sceneObjects: SceneObject[];
  private renderer: Renderer;

  constructor(canvas: HTMLCanvasElement) {
    this.context = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    this.sceneObjects = [];

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    });
  }

  public add(sceneObject: SceneObject): void {
    this.sceneObjects.push(sceneObject);
  }

  public start(): void {
    this.sceneObjects.forEach((obj: SceneObject) => obj.init(this.context));

    this.update();
    this.renderer.setSize(this.context.width, this.context.height);
    this.renderer.render(this.context.scene, this.context.mainCamera);
    requestAnimationFrame(this.update.bind(this));
  }

  public update(): void {
    requestAnimationFrame(this.update.bind(this));
    this.sceneObjects.forEach((obj) => obj.update());
    this.renderer.render(this.context.scene, this.context.mainCamera)
  }
}
