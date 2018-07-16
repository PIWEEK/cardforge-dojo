import { Context, SceneObject } from './SceneManager';
import * as THREE from 'three';
import Stats from 'three/examples/js/libs/stats.min';

export default class SceneHelpers implements SceneObject {
  private stats: Stats;

  public init(context: Context): void {
    // Stats plugin
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    const container = document.getElementsByTagName("body")[0];
    container.appendChild(stats.domElement);
    this.stats = stats;

    if (context.showHelpers) {
      // Axes helper
      var axesHelper = new THREE.AxesHelper(1);
      context.scene.add(axesHelper);
    }
  }

  public update(): void {
    this.stats.update();
  }

}
