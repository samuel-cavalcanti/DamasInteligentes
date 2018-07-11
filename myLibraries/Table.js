class CheckersTable {
  constructor() {
    this.grid = 56; // tamanho aprox do quadado da imagem, tamanho real: 56x57
    this.matrix = [];
    this.size = 8; // tamanho do tabuleiro é  8x8 
    this.createMatrix();
    this.pieces = [];
    this.chosen = -1;
  }
  createPieces() {
    for (var i = 0; i < 12; i++) { // chamando as peças
      this.pieces[i] = new Men('light');
      this.pieces[12 + i] = new Men('dark');
    }

  }

  setPieces() {
    var n = 0;
    for (var i = 1, j = 0; i < this.size; i += 2, j += 2) {

      // peças brancas 
      this.fill(this.pieces[n + 0], this.matrix[0][i], 0, i);
      this.fill(this.pieces[n + 4], this.matrix[1][j], 1, j);
      this.fill(this.pieces[n + 8], this.matrix[2][i], 2, i);

      // peças pretas 
      this.fill(this.pieces[n + 16], this.matrix[5][j], 5, j);
      this.fill(this.pieces[n + 12], this.matrix[6][i], 6, i);
      this.fill(this.pieces[n + 20], this.matrix[7][j], 7, j);

      n++;
    }

  }

  fill(piece, cell, j, i) {
    piece.pos.set(cell.pos);
    cell.filled = piece.type;
    piece.index = new Index().set(cell.index);
    piece.matrix = cell;
  }


  createMatrix() {

    for (var i = 0; i < this.size; i++) {
      this.matrix[i] = []
      for (var j = 0; j < this.size; j++) {
        this.matrix[i][j] = {
          pos: new p5.Vector(j * this.grid + 25, i * this.grid + 25),
          filled: 'none',
          index: new Index(i, j)
        };

      }
    }
  }


  findMan(turn) {

    if (turn == 'light') // se for light, é as fez das brancas. peças[i], tal que  0 <= i < 12
      var j = 0;
    else // se não, sera a vez das pretas  tal que preta = j | 12 <= j < 24
      var j = 12;


    for (var i = 0; i < 12; i++) {
      if (this.detectMan(mouseX, mouseY, this.pieces[i + j].pos.x, this.pieces[i + j].pos.y, this.grid)) {
        return i + j;
      }

    }

    return -1;

  }

  detectMan(x0, y0, x1, y1, tam) { // detecta se  o dama x0, y0 está dentro de x1,y1
    if (x0 >= x1 && x0 <= (x1 + tam) && y0 >= y1 && y0 <= (y1 + tam)) {
      return true;
    }
    return false;

  }

  validPos(currentPiece, turn) {
    var validList = [];
    var currentPos = currentPiece.index;
    // y = 56*x + 25
    // x = (y - 25)/56


    validList.push(currentPiece.matrix);


    if (turn == 'light') {


      var enemy = 'dark';

      var nextPos = new Index(currentPos.i + 1, currentPos.j + 1);


      this.searchForEnemy(currentPos, nextPos, enemy, validList);

      nextPos = new Index(currentPos.i - 1, currentPos.j + 1);


      this.searchForEnemy(currentPos, nextPos, enemy, validList);

    } else {
      var enemy = 'light';

      var nextPos = new Index(currentPos.i - 1, currentPos.j - 1);

      this.searchForEnemy(currentPos, nextPos, enemy, validList);

      nextPos = new Index(currentPos.i + 1, currentPos.j - 1);

      this.searchForEnemy(currentPos, nextPos, enemy, validList);
    }

    print('search ', validList);


    if (this.verifyPosition(currentPiece, validList))
      return true;

    return false



  }

  searchForEnemy(currentPos, nextPos, enemy, validList) {
 
   
    if (nextPos.i < 8 && nextPos.j < 8 && nextPos.i > -1 && nextPos.j > -1) {
     
      print(this.matrix[nextPos.j][nextPos.i] );
      if (this.matrix[nextPos.j][nextPos.i].filled == 'none') {
       
       
        validList.push(this.matrix[nextPos.j][nextPos.i]);
       


        if (this.matrix[currentPos.j][currentPos.i].filled == enemy) {
          this.nextCell(currentPos, nextPos);
          this.searchForEnemy(currentPos, nextPos, enemy, validList);

        }


      } else if (this.matrix[nextPos.j][nextPos.i].filled == enemy && this.matrix[currentPos.j][currentPos.i].filled != enemy) {

        this.nextCell(currentPos, nextPos);


        this.searchForEnemy(currentPos, nextPos, enemy, validList);

      }
    }

  }

  nextCell(currentPos, nextPos) {
    var i = nextPos.i - currentPos.i;
    var j = nextPos.j - currentPos.j;

    currentPos.set(nextPos.i, nextPos.j);

    nextPos.i += i;
    nextPos.j += j;


  }


  verifyPosition(currentPiece, validList) {
    //    print(validList);

    for (var i = 1; i < validList.length; i++) {
      if (this.detectMan(mouseX, mouseY, validList[i].pos.x, validList[i].pos.y, this.grid)) {
        this.swap(currentPiece, validList[i]);

        return true;
      }

    }

    currentPiece.pos.set(validList[0].pos);
    return false;

  }


  swap(piece, cell) {
    piece.matrix.filled = 'none';
    piece.pos.set(cell.pos);
    piece.matrix = cell;
    cell.filled = piece.type;
    piece.index = {
      j: (cell.pos.y - 25) / this.grid,
      i: (cell.pos.x - 25) / this.grid
    };

  }

}