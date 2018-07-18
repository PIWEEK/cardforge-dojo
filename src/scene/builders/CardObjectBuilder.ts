import * as THREE from 'three';

import { Collection, CardData } from 'data/Collection';
import { loadSpriteTexture } from 'scene/builders/TexturesBuilder';
import { buildRoundedRectShape } from 'scene/builders/ShapesBuilder';

export function buildCardGeometry(
  width: number,
  height: number,
  depth: number,
  radius: number,
): THREE.ExtrudeGeometry {
  const shape = buildRoundedRectShape(width, height, radius);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: false
  });

  // Center the axis so rotations work as expected
  geometry.translate(-(width / 2), -(height / 2), -(depth / 2));

  // Doesn't work, should smooth the edges on the rounded corner
  // geometry.mergeVertices();
  // geometry.computeVertexNormals();

  // Setup the material indexes on the faces
  geometry.computeFaceNormals();

  geometry.faces.forEach((f) => f.materialIndex = 0);

  geometry.faces
    .filter((f) => Math.abs(f.normal.z - 1.0) < 0.001)
    .forEach((f) => f.materialIndex = 1);

  geometry.faces
    .filter((f) => Math.abs(f.normal.z + 1.0) < 0.001)
    .forEach((f) => f.materialIndex = 2);

  return geometry;
}

export function buildCardObject(
  width: number,
  height: number,
  depth: number,
  radius: number,
  collection: Collection,
  card: CardData
): THREE.Mesh {
  const geometry = buildCardGeometry(width, height, depth, radius);

  const mesh = new THREE.Mesh(
    new THREE.BufferGeometry().fromGeometry(geometry),
    [
      new THREE.MeshStandardMaterial({
        color: 0xFFFFFF
      }),
      new THREE.MeshStandardMaterial({
        map: loadSpriteTexture(collection, card.front)
      }),
      new THREE.MeshStandardMaterial({
        map: loadSpriteTexture(collection, collection.back)
      })
    ]
  );

  return mesh;
}

export default {
  buildCardObject
}
