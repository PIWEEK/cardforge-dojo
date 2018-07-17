import * as THREE from 'three';

export function buildSelectionBox(
  width: number,
  height: number,
  depth: number,
  mesh: THREE.Object3D
): THREE.Object3D {
  const glow = new THREE.Mesh(
    new THREE.BoxGeometry(width * 1.01, height * 1.01, depth * 1.1),
    new THREE.MeshBasicMaterial({
      color: 0x0088ff,
      transparent: true,
      opacity: 0.50
    })
  );
  glow.position.copy(mesh.position);
  glow.rotation.copy(mesh.rotation);
  return glow;
}
