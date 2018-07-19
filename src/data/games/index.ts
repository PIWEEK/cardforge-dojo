import uuid from 'uuid/v4';
import Game from 'data/Game';
import Collection from 'data/Collection';
import Deck from 'data/Deck';

import test from './game-test';
import solitaire from './game-solitaire';

function createGame(gameTemplate: string, collections: Collection[], decks: Deck[]): Game {
  return solitaire(collections, decks);
}

export default createGame;
