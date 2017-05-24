var Tabuleiro = [];


function Casa() {

  this.pos = [0, 0];

  this.addDama = function(peça) {
    peça.pos.set(this.pos[0], this.pos[1]);
  };

  this.rmDama = function() {
    this.pos = [0, 0];
  };

  this.mvDama = function(posInicial, posFinal) {
    posFinal.addDama(peça);
    posInicial.rmDama();


  };
}
