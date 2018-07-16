
export default class Box {

  init(context) {
    this.object = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.2, 0.2),
      new THREE.MeshNormalMaterial()
    );

    this.object.position.z += 0.2;

    context.scene.add(this.object);
  }

  update() {
    this.object.rotation.x += 0.01;
    this.object.rotation.y += 0.01;
    this.object.rotation.z += 0.01;
  }

}
