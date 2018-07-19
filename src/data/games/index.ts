import uuid from 'uuid/v4';
import Game from 'data/Game';
import Collection from 'data/Collection';
import Deck from 'data/Deck';

import test from './game-test';

function createGame(gameTemplate: string, collections: Collection[], decks: Deck[]): Game {
  return test(collections, decks);
}

export default createGame;
