import * as THREE from 'three';

import { Collection, SpriteCoord, resolveSprite, cardMeasures } from 'data/Collection';

export function loadSpriteTexture(collection: Collection, coord: SpriteCoord | string): THREE.Texture {
  if (typeof coord === "string") {
    const urlTexture = new THREE.TextureLoader().load(coord);
    urlTexture.anisotropy = 4;
    return urlTexture;
  }

  const spriteData = resolveSprite(collection, coord);
  const spriteWidth = collection.width * spriteData.columns;
  const spriteHeight = collection.height * spriteData.rows;
  const spriteCols = spriteData.columns;
  const spriteRows = spriteData.rows;
  const [row, column] = coord.position;

  const { width: faceWidth, height: faceHeight } = cardMeasures(collection);

    const texture = new THREE.TextureLoader().load(spriteData.url);
  texture.anisotropy = 4;

  const offsetX = (1 / spriteWidth) * (spriteWidth / spriteCols)
  texture.offset.x = offsetX * column;
  texture.repeat.x = (1 / faceWidth) / spriteCols;

  const offsetY = (1 / spriteHeight) * (spriteHeight / spriteRows)
  texture.offset.y = 1.0 - (offsetY * (row + 1));
  texture.repeat.y = (1 / faceHeight) / spriteRows;

  return texture;
}

export default {
  loadSpriteTexture
};
