var peça = [];
var on = false;
var cor = true; // true == brancas , false  == pretas
var escolhido = -1;
var enter = true;
var suaVez = true;



function GameFunctions() {



  this.start = function() { // começa o jogo , chamando as peças  e setando posições iniciais

    startPeças(); // damas.js instancia as damas
    setPeças(); // Tabuleiro.js seta as peças na matrix



  };

  this.goingON = function() {
    if (on) {
      peça[escolhido].hold(on) // peça[n].hold.on == segura a peça,ou seja, prente a peça no mouse
    }

    updatePieces();

  };

}


function mouseClicked() { // ao clicar
  if (on) { // caso já tenha clicado,  a dama desgruda
    if (cor) { // true == brancas , false == pretas
      if (validPos(posAtual.x, posAtual.y))
          cor = false;

    } else if (validPos(posAtual.x, posAtual.y))
        cor = true;



    on = false;


  } else if (findDama(cor) != -1 ) {
    escolhido = findDama(cor);
    on = true;

    posAtual = createVector(peça[escolhido].pos.x, peça[escolhido].pos.y);
    //    print("posAtual" + posAtual);

  }
}
