import * as THREE from 'three';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';

export default class SceneRenderer implements ObjectRenderer {

  public init(context: Context): void {
    const scene = new THREE.Scene();
    context.scene = scene;
  }

  public update(): void {
  }
}
