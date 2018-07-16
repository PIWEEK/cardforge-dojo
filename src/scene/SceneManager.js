import 'three';
import 'three/examples/js/controls/OrbitControls';

export class SceneManager {
  constructor(canvas) {
    const { width, height } = canvas;

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

  add(object) {
    this.sceneObjects.push(object);
  }

  createScene() {
    const scene = new THREE.Scene();
    return scene;
  }

  start() {
    this.sceneObjects.forEach((obj) => obj.init(this.context));

    this.update();
    this.renderer.setSize(this.context.width, this.context.height);
    this.renderer.render(this.context.scene, this.context.mainCamera);
    requestAnimationFrame(this.update.bind(this));
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    this.sceneObjects.forEach((obj) => obj.update());
    this.renderer.render(this.context.scene, this.context.mainCamera)
  }
}

export default SceneManager;
