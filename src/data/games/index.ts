import uuid from 'uuid/v4';
import Game from 'data/Game';
import Collection from 'data/Collection';
import Deck from 'data/Deck';

import test from './game-test';
import solitaire from './game-solitaire';
import solitario from './game-solitaire-spanish';

function createGame(gameTemplate: string, collections: Collection[], decks: Deck[]): Game {
  if (gameTemplate === 'solitaire') {
    return solitaire(collections, decks);
  }
  if (gameTemplate === 'solitario') {
    return solitario(collections, decks);
  }
  if (gameTemplate === 'test') {
    return test(collections, decks)
  }
  return test(collections, decks);
}

export default createGame;
