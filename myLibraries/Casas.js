var Tabuleiro = [];


function Casa() {

  this.pos = [0, 0];

  this.busy = false;

  this.addDama = function(peça) {
    peça.pos.set(this.pos[0], this.pos[1]);
    this.busy =true;
  };

  this.rmDama = function(peça) {
    peça.pos = [0, 0];
  };

  this.mvDama = function(posInicial, posFinal) {
    posFinal.addDama(peça);
    posInicial.rmDama();

  };


}
