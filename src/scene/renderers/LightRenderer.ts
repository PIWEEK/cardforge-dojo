import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';

export default class LightRenderer implements ObjectRenderer {

  public init(context: Context): void {
    const light = new THREE.SpotLight(0xFFFFFF, 1);
    light.angle = Math.PI / 6;
    light.position.set(0, 3, 0);
    light.castShadow = true;
    light.penumbra = 1.0;
    light.shadow.camera.far = 4;
    light.shadow.mapSize.width = context.shadowMapSize.width;
    light.shadow.mapSize.height = context.shadowMapSize.height;
    context.scene.add(light);
  }

  public update(): void {
  }

}
