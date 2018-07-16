import * as THREE from 'three';
import { Context, SceneObject } from './SceneManager';

export default class Card implements SceneObject {

  private obj: THREE.Object3D;

  private roundedRectShape(width, height, radius) {
    var shape = new THREE.Shape();
    shape.moveTo(0, radius);
    shape.lineTo(0, height - radius);
    shape.quadraticCurveTo(0, height, radius, height);
    shape.lineTo(width - radius, height);
    shape.quadraticCurveTo(width, height, width, height - radius);
    shape.lineTo(width, radius);
    shape.quadraticCurveTo(width, 0, width - radius, 0);
    shape.lineTo(radius, 0);
    shape.quadraticCurveTo(0, 0, 0, radius);
    return shape;
  }
  public init(context: Context): void {
    const { width, height, depth, radius } = context.cardDimension;
    const shape = this.roundedRectShape(width, height, radius);

    const extrudeSettings = {
      amount: depth,
      bevelEnabled: false
    };

    const mesh = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, extrudeSettings),
      new THREE.MeshStandardMaterial()
    );

    mesh.geometry.translate(-(width / 2), -(height / 2), -(depth / 2));
    mesh.rotation.x = Math.PI / 2;
    mesh.position.y = (depth / 2);
    mesh.castShadow = true;
    mesh.receiveShadow = false;

    context.scene.add(mesh);
    this.obj = mesh;
  }

  public update(): void {
    //this.obj.rotation.x += 0.01;
    //this.obj.rotation.y += 0.01;
    //this.obj.rotation.z += 0.01;
  }

}
