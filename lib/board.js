'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numRows, numCols, numBombs) {
    _classCallCheck(this, Board);

    this._numTiles = numRows * numCols;
    this._numBombs = numBombs;
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols);
    this._bombBoard = Board.genBombBoard(numRows, numCols, numBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIdx, colIdx) {
      //Check if a tile has been flipped
      if (this._playerBoard[rowIdx][colIdx] !== ' ') {
        console.log('This tile has been flipped');
        return;
        //Check if the tile has a bomb
      } else if (this._bombBoard[rowIdx][colIdx] === 'B') {
        this._playerBoard[rowIdx][colIdx] = 'B';
      } else {
        this._playerBoard[rowIdx][colIdx] = this.getNumberOfNeighborBombs(rowIdx, colIdx);
      }
      this._numTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(row, col) {
      var _this = this;

      var neighbors = [];

      //Create the list of neighbors in an more automated fashion
      for (var i = -1; i < 2; i++) {
        for (var j = -1; j < 2; j++) {
          //to exclude the selected tile
          if ((i !== 0 || j !== 0) && row + i > -1 && col + j > -1) {
            neighbors.push([row + i, col + j]);
          }
        }
      }
      //console.log(neighbors);

      var actualRows = this._bombBoard.length;
      var actualCols = this._bombBoard[0].length;
      var neighborBombs = 0;

      //console.log(actualRows);

      neighbors.forEach(function (el) {
        var curRow = el[0];
        var curCol = el[1];

        //console.log(curRow);
        //console.log(curCol);
        //console.log(this._bombBoard.length);
        if (curRow < actualRows && curCol < actualCols) {
          if (_this._bombBoard[curRow][curCol] === 'B') {
            neighborBombs++;
          }
        }

        //console.log(neighborBombs);
      });
      return neighborBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numTiles !== this._numBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      //console.log(board);
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'printBombBoard',
    value: function printBombBoard() {
      //console.log(board);
      console.log('\n' + this._bombBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(rows, columns) {
      var board = [];
      for (var i = 0; i < rows; i++) {
        var createCol = [];
        for (var j = 0; j < columns; j++) {
          createCol.push(' ');
        }
        board.push(createCol);
      }
      return board;
    }
  }, {
    key: 'genBombBoard',
    value: function genBombBoard(rows, columns, bombs) {
      var board = [];
      for (var i = 0; i < rows; i++) {
        var createCol = [];
        for (var j = 0; j < columns; j++) {
          createCol.push('N');
        }
        board.push(createCol);
      }

      var numBombsPlaced = 0;
      var rowPlace, colPlace;

      while (numBombsPlaced < bombs) {
        rowPlace = Math.floor(Math.random() * rows);
        colPlace = Math.floor(Math.random() * columns);

        //console.log(rowPlace);

        if (board[rowPlace][colPlace] != 'B') {
          board[rowPlace][colPlace] = 'B';
          numBombsPlaced++;
        }
      }
      return board;
    }
  }]);

  return Board;
}();