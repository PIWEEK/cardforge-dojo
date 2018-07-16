import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class OrbitCamera {

  private controls: THREE.OrbitControls;

  public init(context: Context): void {
    const { width, height } = context;

    const camera = new THREE.PerspectiveCamera(
      70,
      width / height,
      0.01,
      100
    );
    camera.position.z = 1;
    camera.position.x = 0.25;
    camera.position.y = 0.25;
    camera.up = new THREE.Vector3(0, 1, 0);

    this.controls = new THREE.OrbitControls(camera);
    this.controls.enableKeys = true;
    this.controls.update();

    context.mainCamera = camera;
  }

  public update(): void {
    this.controls.update();
  }

}
