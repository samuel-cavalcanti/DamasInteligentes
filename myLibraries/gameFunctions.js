var peça = [];
var on = false;
var cor = true;

function GameFunctions() {

  this.start = function() { // começa o jogo , chamando as peças  e setando posições iniciais
    xBranca = 81;
    yBranca = 25;
    xPreta = 25;
    yPreta = 305;
    umNãoUmSim = true;

    for (i = 0; i < 12; i++) { // chamando as peças

      peça[i] = new Dama();
      peça[12 + i] = new Dama();
    }



    for (i = 0; i < 12; i++) { // setando posições iniciais
      peça[i].pos.add(xBranca, yBranca);
      peça[i + 12].pos.add(xPreta, yPreta);

      xBranca += 112;
      xPreta += 112;

      if ((i + 1) % 4 == 0) {
        yBranca += 56;
        yPreta += 56;

        if (umNãoUmSim) {
          xBranca = 25;
          xPreta = 81;
          umNãoUmSim = false;
        } else {
          xBranca = 81;
          xPreta = 25;
        }




      }
    }




  };

  this.goingON = function() {
    image(tabuleiro, 0, 0);


    if (on)
      peça[escolhido].hold(on); // segura a peça


    updatePieces();





  };

}


function mouseClicked() { // ao clicar
  if (on) // caso já tenha clicado a dama desgruda
    on = false;

  else if (findDama(cor) != -1) {
    escolhido = findDama(cor);
    on = true;

    if (cor)
      cor = false;
    else
      cor = true;


  }
}

function updatePieces() { // atualiza as imagens das damas

  for (i = 0; i < 12; i++) {
    peça[i].branca();
    peça[i + 12].preta();

  }

}



function findDama(cor) { // procura  a peça
  if (cor)
    j = 0;


  if (!cor)
    j = 12;


  for (i = 0; i < 12; i++) {
    if (detectDama(mouseX, mouseY, peça[i + j].pos.x, peça[i + j].pos.y, 55, 55)) {

      return i + j;
    }

  }

  return -1;

}

function detectDama(x0, y0, x1, y1, dimensãoX, dimensãoY) { // detecta se  o objeto x0, y0 está dentro de x1,y1
  if (x0 >= x1 && x0 <= (x1 + dimensãoX) && y0 >= y1 && y0 <= (y1 + dimensãoY)) {
    return true;
  }
  return false;

}
