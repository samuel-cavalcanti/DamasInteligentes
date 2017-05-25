var damaBranca;
var damaPreta;


function Dama() { // Classe Dama

  this.pos = createVector(0, 0); // cada peça de dama tem usa posição no espaço

  this.size = 55;

  this.branca = function() { // Display ou imagem que representa a peça branca

    image(damaBranca, this.pos.x, this.pos.y);
  };

  this.preta = function() { // Display ou imagem que representa a peça preta

    image(damaPreta, this.pos.x, this.pos.y);

  };


  this.hold = function(on) {
    if (on)
      this.pos.set(mouseX - 25, mouseY - 25);
  };




}

function startPeças() {

  for (i = 0; i < 12; i++) { // chamando as peças

    peça[i] = new Dama();
    peça[12 + i] = new Dama();
  }

}



function findDama(cor) { // procura  a peça
  if (cor) // se for true, é as fez das brancas.  peças[i], tal que  0 <= i < 12
    j = 0;
  else // se não, sera a vez das pretas  tal que preta = j | 12 <= j < 24
    j = 12;


  for (i = 0; i < 12; i++) {
    if (detectDama(mouseX, mouseY, peça[i + j].pos.x, peça[i + j].pos.y, 55)) {

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
