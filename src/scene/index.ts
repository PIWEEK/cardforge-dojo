import SceneManager from './SceneManager';

import SceneRenderer from './renderers/SceneRenderer';
import CameraRenderer from './renderers/CameraRenderer';
import LightRenderer from './renderers/LightRenderer';
import HelperRenderer from './renderers/HelperRenderer';
import GroundRenderer from './renderers/GroundRenderer';
import BoxRenderer from './renderers/BoxRenderer';
import CardRenderer from './renderers/CardRenderer';

export default {
  build(canvas: HTMLCanvasElement): SceneManager {
    // Initialize scene
    const sceneManager = new SceneManager(canvas);

    [
      // Global
      new SceneRenderer(),
      new CameraRenderer(),
      new LightRenderer(),
      new HelperRenderer(),

      // Objects
      new GroundRenderer(),
      new CardRenderer(),
    ].forEach(
      (renderer) => sceneManager.add(renderer)
    );

    return sceneManager;
  }
}
