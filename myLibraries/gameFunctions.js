var pieces = [];
var on = false;
var cor = true; // true == brancas , false  == pretas
var escolhido = -1;
var enter = true;
var suaVez = true;



function GameFunctions() {

  this.start = function() { // começa o jogo , chamando as peças  e setando posições iniciais

    startPieces(); // damas.js instancia as damas
    setPieces(); // Tabuleiro.js seta as peças na matrix

  };

  this.goingON = function() {
    

    updatePieces();

  };

}


function mouseClicked() { // ao clicar
  if (on) { // caso já tenha clicado,  a dama desgruda
    if (cor) { // true == brancas , false == pretas
      if (validPos(currentPos.x, currentPos.y))
          cor = false;

    } else if (validPos(currentPos.x, currentPos.y))
        cor = true;


    on = false;

  } else if (findDama(cor) != -1 ) {
    escolhido = findDama(cor);
    on = true;

    currentPos = createVector(pieces[escolhido].pos.x, pieces[escolhido].pos.y);
    //    print("posAtual" + posAtual);

  }
}
