// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board.js';

class Game {
  constructor(numRows, numCols, numBombs) {
    this._board = new Board(numRows, numCols, numBombs);
  }

  playMove(rowIdx, colIdx) {
    this._board.flipTile(rowIdx,colIdx);
    //console.log(this._playerBoard);
    if(this._board.playerBoard[rowIdx][colIdx] === 'B') {
      console.log('You hit a bomb! BOOOM!');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('You win! Boots and cats and boots and cats!');
    } else {
      console.log('You stayed alive! Current Board:')
      this._board.print();
    }
  }

  checkBombLayout() {
    return this._board.printBombBoard();
  }
}
