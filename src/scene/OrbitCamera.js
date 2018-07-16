
export default class OrbitCamera {

  init(context) {
    const { width, height } = context;

    const camera = new THREE.PerspectiveCamera(
      70,
      width / height,
      0.01,
      100
    );
    camera.position.z = 1;
    camera.position.y = -1;
    camera.lookAt(0, 0, 0);

    this.controls = new THREE.OrbitControls(camera);
    this.controls.update();

    context.mainCamera = camera;
  }

  update() {
    this.controls.update();
  }

}
