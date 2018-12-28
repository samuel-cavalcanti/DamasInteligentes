class CheckersTable {
  constructor() {
    this.grid = 56; // tamanho aprox do quadado da imagem, tamanho real: 56x57
    this.matrix = [];
    this.size = 8; // tamanho do tabuleiro é  8x8 
    this.turn = 'light';
    this.enemy = 'dark';
    this.empt = 'empt';
    this.invalid = 'invalid';
    this.pieces = [];
    this.chosen = -1;
    this.createMatrix();
  }
  createPieces() {
    for (var i = 0; i < 12; i++) { // chamando as peças
      this.pieces[i] = new Men('light');
      this.pieces[12 + i] = new Men('dark');
    }

  }

  setPieces() {
    var n = 0;
    for (var odd = 1, even = 0; odd < this.size; odd += 2, even += 2) {

      // peças brancas 
      this.fill(this.pieces[n + 0], this.matrix[odd][0]);
      this.fill(this.pieces[n + 4], this.matrix[even][1]);
      this.fill(this.pieces[n + 8], this.matrix[odd][2]);

      // peças pretas 
      this.fill(this.pieces[n + 16], this.matrix[even][5]);
      this.fill(this.pieces[n + 12], this.matrix[odd][6]);
      this.fill(this.pieces[n + 20], this.matrix[even][7]);

      n++;
    }

  }

  fill(piece, cell) {
    piece.pos.set(cell.pos);
    cell.filled = piece.type;

    piece.index = new Index().set(cell.index);
  }


  createMatrix() {

    for (var i = 0; i < this.size; i++) {
      this.matrix[i] = []
      for (var j = 0; j < this.size; j++) {
        var filling;
        if (i % 2 == 0 && j % 2 == 0 || i % 2 != 0 && j % 2 != 0)
          filling = this.invalid;
        else
          filling = this.empt;

        this.matrix[i][j] = {
          pos: new p5.Vector(i * this.grid + 25, j * this.grid + 25),
          filled: filling,
          index: new Index(i, j)
        };

      }
    }
  }


  findMan() {
    var j;
    if (this.turn == 'light') // se for light, é as fez das brancas. peças[i], tal que  0 <= i < 12
      j = 0;
    else // se não, sera a vez das pretas  tal que preta = j | 12 <= j < 24
      j = 12;


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

  validPos(currentPiece) {

    var currentPos = new Index().set(currentPiece.index)

    this.validList = [this.matrix[currentPos.i][currentPos.j]];

    this.enemyList = [];

    if (this.turn == 'light')
      this.enemy = 'dark';
    else
      this.enemy = 'light';



    this.searchForLeftAndRight(currentPos);

    print('search ', this.validList);

    if (this.verifyPosition(currentPiece))
      return true;

    return false

  }

  searchForLeftAndRight(currentPos) {

    if (this.turn == 'light') {
      this.enemy = 'dark';
      this.searchForTheLeft(currentPos, 1);

      this.searchForTheRight(currentPos, -1, 1);

    } else {
      this.enemy = 'light';

      this.searchForTheLeft(currentPos, -1);

      this.searchForTheRight(currentPos, 1, -1);

    }






  }

  searchForThreeDirections(currentPos, nextPos) {
    var delta = this.getDelta(currentPos, nextPos);

    if (delta.dx != 1 && delta.dy != 1)
      this.searchForTheLeft(currentPos, 1);

    if (delta.dx != -1 && delta.dy != 1)
      this.searchForTheRight(currentPos, -1, 1);

    if (delta.dx != -1 && delta.dy != -1)
      this.searchForTheLeft(currentPos, -1);

    if (delta.dx != 1 && delta.dy != -1)
      this.searchForTheRight(currentPos, 1, -1);



  }

  searchForTheLeft(currentPos, delta) {

    var initalPos = new Index().set(currentPos);

    var nextPos = new Index(currentPos.i + delta, currentPos.j + delta);

    this.searchForValidPos(initalPos, nextPos);
  }

  searchForTheRight(currentPos, dx, dy) {

    var initalPos = new Index().set(currentPos);

    var nextPos = new Index(currentPos.i + dx, currentPos.j + dy);

    this.searchForValidPos(initalPos, nextPos);
  }


  searchForValidPos(currentPos, nextPos) {

    if (this.isInvalidPos(nextPos))
      return;


    var filledCorrentPos = this.matrix[currentPos.i][currentPos.j].filled;

    var filledNextPos = this.matrix[nextPos.i][nextPos.j].filled;


    if (filledNextPos == this.empt && filledCorrentPos == this.empt)
      return


    if (filledNextPos == this.turn)
      return

    if (filledNextPos == this.enemy && filledCorrentPos == this.enemy)
      return;

    if (filledNextPos == this.empt && filledCorrentPos == this.turn) {
      this.validList.push(this.matrix[nextPos.i][nextPos.j]);
      return;
    }

    if (filledNextPos == this.empt && filledCorrentPos == this.enemy) {
      this.validList.push(this.matrix[nextPos.i][nextPos.j]);
      this.enemyList.push(this.findEnemyByMatrix(this.matrix[currentPos.i][currentPos.j]))
      this.nextCell(currentPos, nextPos)
      this.searchForThreeDirections(currentPos, nextPos)

    }

    if (filledNextPos == this.enemy && filledCorrentPos == this.empt) {

      this.nextCell(currentPos, nextPos)
      this.searchForValidPos(currentPos, nextPos)
    }

    if (filledNextPos == this.enemy && filledCorrentPos == this.turn) {
      this.nextCell(currentPos, nextPos)
      this.searchForValidPos(currentPos, nextPos)
    }

  }

  nextCell(currentPos, nextPos) {
    var delta = this.getDelta(currentPos, nextPos);

    currentPos.set(nextPos);

    nextPos.i += delta.dx;
    nextPos.j += delta.dy;


  }

  getDelta(currentPos, nextPos) {
    var deltaX = nextPos.i - currentPos.i;
    var deltaY = nextPos.j - currentPos.j;

    return {
      dx: deltaX,
      dy: deltaY
    };

  }


  verifyPosition(currentPiece) {

    for (var i = 1; i < this.validList.length; i++) {


      if (this.detectMan(mouseX, mouseY, this.validList[i].pos.x, this.validList[i].pos.y, this.grid)) {
        this.swap(currentPiece, this.validList[i]);
        this.removeEnemies();
        return true;
      }

    }

    currentPiece.pos.set(this.validList[0].pos);
    return false;

  }


  swap(piece, cell) {

    this.matrix[piece.index.i][piece.index.j].filled = this.empt;
    piece.pos.set(cell.pos);
    cell.filled = piece.type;
    piece.index.set(cell.index);

  }

  isInvalidPos(nextPos) {
    if (nextPos.i < 8 && nextPos.j < 8 && nextPos.i > -1 && nextPos.j > -1)
      if (this.matrix[nextPos.i][nextPos.j].filled != this.invalid)
        return false;

    return true

  }

  findEnemyByMatrix(cell) {
    var enemyIndex = cell.index;

    var j;
    if (this.enemy == 'light') // se for light, é as fez das brancas. peças[i], tal que  0 <= i < 12
      j = 0;
    else // se não, sera a vez das pretas  tal que preta = j | 12 <= j < 24
      j = 12;


    for (var i = 0; i < 12; i++) {

      if (this.pieces[i + j].index.equal(enemyIndex))
        return this.pieces[i + j];

    }

    return -1;
  }

  removeEnemies() {
    for (var i in this.enemyList) {

      if (this.enemy == 'dark') {

      }


    }

  }

}