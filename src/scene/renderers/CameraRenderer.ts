import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';

export default class CameraRenderer implements ObjectRenderer {

  private context: Context;
  private controls: THREE.OrbitControls;

  public init(context: Context): void {
    this.context = context;
    const { width, height } = context;

    const camera = new THREE.PerspectiveCamera(
      70,
      width / height,
      0.01,
      100
    );
    camera.position.z = 0.663;
    camera.position.x = 0;
    camera.position.y = 1.326;

    this.controls = new THREE.OrbitControls(camera);
    this.controls.enableKeys = true;
    this.controls.keys = {
      LEFT: 65,
      UP: 87,
      RIGHT: 68,
      BOTTOM: 83
    };

    this.controls.mouseButtons = {
      ZOOM: -1, // Disble
      ORBIT: THREE.MOUSE.RIGHT,
      PAN: THREE.MOUSE.MIDDLE
    };

    this.controls.update();

    context.mainCamera = camera;
  }

  public render(): void {
    this.controls.update();
  }

  public dispose() : void {
  }

}
