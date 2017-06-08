var peça = [];
var on = false;
var cor = true;
var escolhido = -1;



function GameFunctions() {



  this.start = function() { // começa o jogo , chamando as peças  e setando posições iniciais

    startPeças(); // damas.js instancia as damas
    setPeças();  // Tabuleiro.js seta as peças na matrix



  };

  this.goingON = function() {
    if (on) {
      peça[escolhido].hold(on); // segura a peça
    }
    updatePieces();

  };

}


function mouseClicked() { // ao clicar
  if (on) { // caso já tenha clicado,  a dama desgruda
    if (cor){
      if( validPos())
        cor = false;
    }
          else if (validPos())
      cor = true;

    on = false;


  } else if (findDama(cor) != -1) {
    escolhido = findDama(cor);
    on = true;




    posAtual = createVector(peça[escolhido].pos.x, peça[escolhido].pos.y);
    reprovadaPos = createVector(peça[escolhido].pos.x, peça[escolhido].pos.y);
    //    print("posAtual" + posAtual);

  }
}
