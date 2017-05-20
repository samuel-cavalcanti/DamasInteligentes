var damaBranca;
var damaPreta;





function Dama(){ // Classe Dama

  this.posDama = createVector(0,0); // cada peça de dama tem usa posição no espaço

  this.branca = function() {  // Display ou imagem que representa a peça 

      image(damaBranca,this.posDama.x,this.posDama.y);
  };

  this.preta = function() {

    image(damaPreta,this.posDama.x,this.posDama.y);

  };


}
