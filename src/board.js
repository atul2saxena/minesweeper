export class Board {
  constructor (numRows, numCols, numBombs) {
    this._numTiles = numRows * numCols;
    this._numBombs = numBombs;
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols);
    this._bombBoard = Board.genBombBoard(numRows, numCols, numBombs);
  }

  get playerBoard () {
    return this._playerBoard;
  }

  flipTile (rowIdx, colIdx) {
    //Check if a tile has been flipped
    if(this._playerBoard[rowIdx][colIdx] !== ' ') {
      console.log('This tile has been flipped');
      return;
    //Check if the tile has a bomb
    } else if(this._bombBoard[rowIdx][colIdx] === 'B') {
      this._playerBoard[rowIdx][colIdx] = 'B';
    } else {
      this._playerBoard[rowIdx][colIdx] = this.getNumberOfNeighborBombs(rowIdx, colIdx);
    }
    this._numTiles--;
  }

  getNumberOfNeighborBombs (row, col) {
    const neighbors = [];

    //Create the list of neighbors in an more automated fashion
    for(var i = -1; i < 2; i++) {
      for(var j = -1; j < 2; j++) {
        //to exclude the selected tile
        if((i !== 0 || j !== 0) && ((row+i) > -1 && (col+j) > -1)) {
          neighbors.push([row+i,col+j]);
        }
      }
    }
    //console.log(neighbors);

    const actualRows = this._bombBoard.length;
    const actualCols = this._bombBoard[0].length;
    var neighborBombs = 0;

    //console.log(actualRows);

    neighbors.forEach( el => {
      const curRow = el[0];
      const curCol = el[1];

      //console.log(curRow);
      //console.log(curCol);
      //console.log(this._bombBoard.length);
      if (curRow < actualRows && curCol < actualCols) {
        if(this._bombBoard[curRow][curCol] === 'B') {
          neighborBombs++;
        }
      }

      //console.log(neighborBombs);

    });
    return neighborBombs;
  }

  hasSafeTiles () {
    return (this._numTiles !== this._numBombs);
  }

  print () {
    //console.log(board);
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  printBombBoard () {
    //console.log(board);
    console.log('\n' + this._bombBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generatePlayerBoard(rows, columns) {
    var board = [];
    for(var i=0; i < rows; i++) {
      var createCol = [];
      for(var j=0; j < columns; j++) {
        createCol.push(' ');
      }
      board.push(createCol);
    }
    return board;
  }

  static genBombBoard (rows, columns, bombs) {
    var board = [];
    for(var i=0; i < rows; i++) {
      var createCol = [];
      for(var j=0; j < columns; j++) {
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

      if(board[rowPlace][colPlace] != 'B') {
        board[rowPlace][colPlace] = 'B';
        numBombsPlaced++;
      }
    }
    return board;
  }
}
