import * as THREE from 'three';

import SpriteInfo from 'scene/SpriteInfo';

export function loadCardTexture(
  info: SpriteInfo,
  faceWidth: number,
  faceHeight: number,
  row: number, column: number
): THREE.Texture {
  const spriteWidth = info.width;
  const spriteHeight = info.height;
  const spriteCols = info.columns;
  const spriteRows = info.rows;

  const texture = new THREE.TextureLoader().load(info.url);
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
  loadCardTexture
};
