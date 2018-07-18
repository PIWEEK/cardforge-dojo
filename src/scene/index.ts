import SceneManager from './SceneManager';

import SceneRenderer from './renderers/SceneRenderer';
import CameraRenderer from './renderers/CameraRenderer';
import LightRenderer from './renderers/LightRenderer';
import HelperRenderer from './renderers/HelperRenderer';
import GroundRenderer from './renderers/GroundRenderer';
import BoardRenderer from './renderers/BoardRenderer';
import CardRenderer from './renderers/CardRenderer';
import DeckRenderer from './renderers/DeckRenderer';

export default {
  build(canvas: HTMLCanvasElement): SceneManager {
    // Initialize scene
    const sceneManager = new SceneManager(canvas);

    // Global handlers (single instance)
    sceneManager.registerGlobal(new SceneRenderer());
    sceneManager.registerGlobal(new CameraRenderer());
    sceneManager.registerGlobal(new LightRenderer());
    sceneManager.registerGlobal(new HelperRenderer());

    // Per object renderers (instance per object)
    sceneManager.register('ground', () => new GroundRenderer());
    sceneManager.register('board', (id) => new BoardRenderer(id));
    sceneManager.register('card',  (id) => new CardRenderer(id));
    sceneManager.register('deck',  (id) => new DeckRenderer(id));

    return sceneManager;
  }
}
