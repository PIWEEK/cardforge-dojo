import 'styles/global.css';

import SceneManager from './scene/SceneManager';
import Scene from './scene/Scene';
import OrbitCamera from './scene/OrbitCamera';
import Ground from './scene/Ground';
import Box from './scene/Box';
import Lightning from './scene/Lightning';
import Helpers from './scene/Helpers';

function start() {
  const canvas = document.getElementById("main");

  // Initialize scene
  const sceneManager = new SceneManager(canvas);

  // General setup
  sceneManager.add(new Scene());
  sceneManager.add(new OrbitCamera());
  sceneManager.add(new Lightning());
  sceneManager.add(new Helpers());

  // Objects
  sceneManager.add(new Ground());
  sceneManager.add(new Box());

  // Start main loop
  sceneManager.start();

}

start();
