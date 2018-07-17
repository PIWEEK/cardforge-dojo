import * as THREE from 'three';
import Stats from 'three/examples/js/libs/stats.min';

import Context from 'scene/Context';
import ObjectRenderer from 'scene/ObjectRenderer';

export default class HelperRenderer implements ObjectRenderer {
  private stats: Stats;

  public init(context: Context): void {
    // Stats plugin
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    const container = document.getElementsByTagName("body")[0];
    container.appendChild(stats.domElement);
    this.stats = stats;
  }

  public update(): void {
    this.stats.update();
  }

}
