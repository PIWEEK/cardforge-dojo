import 'styles/global.css';

import SceneManager from './scene/SceneManager';
import Scene from './scene/Scene';
import OrbitCamera from './scene/OrbitCamera';
import Ground from './scene/Ground';
import Box from './scene/Box';
import Card from './scene/Card';
import Lightning from './scene/Lightning';
import SceneHelpers from './scene/SceneHelpers';

function start() {
  const canvas = document.getElementById("main") as HTMLCanvasElement;

  // Initialize scene
  const sceneManager = new SceneManager(canvas);

  // General setup
  sceneManager.add(new Scene());
  sceneManager.add(new OrbitCamera());
  sceneManager.add(new Lightning());
  sceneManager.add(new SceneHelpers());

  // Objects
  sceneManager.add(new Ground());
  //sceneManager.add(new Box());
  sceneManager.add(new Card());

  // Start main loop
  sceneManager.start();

}

start();
