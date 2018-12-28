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

    var validList = [];


    var currentPos = new Index().set(currentPiece.index)
   
    validList.push(this.matrix[currentPos.i][currentPos.j]);

    this.searchForTheLeftAndRight(currentPos,validList);


    print('search ', validList);


    if (this.verifyPosition(currentPiece, validList))
      return true;


 //   print('matrix:\n', this.matrix[firstPos.i][firstPos.j])
    // currentPiece.pos.set( this.matrix[firstPos.i][firstPos.j].pos)
    return false

  }


  searchForTheLeftAndRight(currentPos,validList){
    
    if (this.turn == 'light') {

      this.enemy = 'dark';

      this.searchForTheLeft(currentPos,validList,1);
      
      this.searchForTheRight(currentPos,validList,-1,1);
     

    } else {
      this.enemy = 'light';

      this.searchForTheLeft(currentPos,validList,-1);

      this.searchForTheRight(currentPos,validList,1,-1);

    }

  }

  searchForTheLeft(currentPos,validList,delta){

    var initalPos = new Index().set(currentPos);

    var nextPos = new Index(currentPos.i + delta, currentPos.j + delta);

    this.searchForValidPos(initalPos, nextPos, validList);

  }

  searchForTheRight(currentPos,validList,dx,dy){

    var initalPos = new Index().set(currentPos);

    var nextPos = new Index(currentPos.i + dx, currentPos.j + dy);

    this.searchForValidPos(initalPos, nextPos, validList);

  }


  searchForValidPos(currentPos, nextPos, validList) {

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
      validList.push(this.matrix[nextPos.i][nextPos.j]);
      return;
    }

    if (filledNextPos == this.empt && filledCorrentPos == this.enemy) {
      validList.push(this.matrix[nextPos.i][nextPos.j]);
      this.nextCell(currentPos, nextPos)
      this.searchForTheLeftAndRight(currentPos,validList)

    }

    if (filledNextPos == this.enemy && filledCorrentPos == this.empt) {
      
      this.nextCell(currentPos, nextPos)
      this.searchForValidPos(currentPos, nextPos, validList)
    }

    if (filledNextPos == this.enemy && filledCorrentPos == this.turn) {
      this.nextCell(currentPos, nextPos)
      this.searchForValidPos(currentPos, nextPos, validList)
    }

  }

  nextCell(currentPos, nextPos) {
    var deltaX = nextPos.i - currentPos.i;
    var deltaY = nextPos.j - currentPos.j;

    currentPos.set(nextPos);

    nextPos.i += deltaX;
    nextPos.j += deltaY;


  }


  verifyPosition(currentPiece, validList) {

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

}