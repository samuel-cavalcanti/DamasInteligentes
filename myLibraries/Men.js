var lightImage;
var darkImage;


class Men { // Classe Dama

  constructor(cor) {

    this.type = cor;

    switch (cor) {

      case 'light':
        this.image = lightImage;
        break;
      case 'dark':
        this.image = darkImage;
        break;
    }

    this.pos = createVector(0, 0); // cada peça de dama tem usa posição no espaço

    this.size = 55;



  }



  uptadeImage() { // Display ou imagem que representa a peça branca


    image(this.image, this.pos.x, this.pos.y);

  }



  holdOn() {

    this.pos.x = mouseX - 27.5;
    this.pos.y = mouseY - 27.5;

  };




}


function findDama(cor) { // procura  a peça
  if (cor == 'light') // se for light, é as fez das brancas. peças[i], tal que  0 <= i < 12
    j = 0;
  else // se não, sera a vez das pretas  tal que preta = j | 12 <= j < 24
    j = 12;


  for (i = 0; i < 12; i++) {
    if (detectDama(mouseX, mouseY, checkers.pieces[i + j].pos.x, checkers.pieces[i + j].pos.y, 55)) {

      return i + j;
    }

  }

  return -1;

}

function detectDama(x0, y0, x1, y1, tam) { // detecta se  o dama x0, y0 está dentro de x1,y1
  if (x0 >= x1 && x0 <= (x1 + tam) && y0 >= y1 && y0 <= (y1 + tam)) {
    return true;
  }
  return false;

}