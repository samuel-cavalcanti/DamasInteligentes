var damaBranca;
var damaPreta;


function Dama(){ // Classe Dama

  this.pos = createVector(0,0); // cada peça de dama tem usa posição no espaço




  this.branca = function() {  // Display ou imagem que representa a peça branca

      image(damaBranca,this.pos.x,this.pos.y);
  };

  this.preta = function() {// Display ou imagem que representa a peça preta

    image(damaPreta,this.pos.x,this.pos.y);

  };




}
