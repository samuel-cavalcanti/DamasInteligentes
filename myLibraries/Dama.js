var damaBranca;
var damaPreta;





function Dama(){

  this.posDama = createVector(0,0);

  this.branca = function() {

      image(damaBranca,this.posDama.x,this.posDama.y);
  };

  this.preta = function() {

    image(damaPreta,this.posDama.x,this.posDama.y);

  };


}
