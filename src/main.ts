import 'styles/global.css';

import SceneBuilder from 'scene';

function start() {
  const canvas = document.getElementById("main") as HTMLCanvasElement;
  const scene = SceneBuilder.build(canvas);
  scene.start();
}

start();
