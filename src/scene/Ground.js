
export default class Ground {

  init(context) {
    this.object = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3, 10),
      new THREE.MeshNormalMaterial()
    );

    //this.object.rotation.
    context.scene.add(this.object);
  }

  update() {
  }

}
