import Stats from 'three/examples/js/libs/stats.min';

export default class Helpers {

  init(context) {
    // Stats plugin
    const stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    const container = document.getElementsByTagName("body")[0];
    container.appendChild(stats.domElement);
    this.stats = stats;

    // Axes helper
    var axesHelper = new THREE.AxesHelper(1);
    context.scene.add(axesHelper);
  }

  update() {
    this.stats.update();
  }

}
