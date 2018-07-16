import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Lightning {

  public init(context: Context): void {
    const light = new THREE.SpotLight(0xFFFFFF, 1);
    light.position.set(0, 3, 0);
    light.castShadow = true;
    light.penumbra = 0.75;
    light.shadow.camera.far = 4;
    light.shadow.mapSize.width = context.shadowMapSize.width;
    light.shadow.mapSize.height = context.shadowMapSize.height;
    context.scene.add(light);

    if (context.showHelpers) {
      context.scene.add(new THREE.SpotLightHelper(light));
      context.scene.add(new THREE.CameraHelper( light.shadow.camera ));
    }
  }

  public update(): void {
  }

}
