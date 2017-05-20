var peça = [];
function GameFunctions (){

  this.start = function() {
  xBranca = 81;
  yBranca = 25;
  xPreta  = 25;
  yPreta  = 305;
  umNãoUmSim = true;

  for(i=0;i<12;i++){

    peça[i] = new Dama();
    peça[12+i] = new Dama();
  }



  for(i=0;i<12;i++){
    peça[i].pos.add(xBranca,yBranca);
    peça[i+12].pos.add(xPreta,yPreta);

    xBranca += 112;
    xPreta  += 112;

      if((i+1) % 4 == 0){
        yBranca += 56;
        yPreta  += 56;



          if(umNãoUmSim){
            xBranca = 25;
            xPreta  = 81;
            umNãoUmSim = false;
          }

          else {
            xBranca = 81;
            xPreta  = 25;
          }




      }
  }

  attPeças();



};

this.goingON = function (){
  image(tabuleiro, 0, 0);

  move(1); // zero para preto, 1 para branco

  attPeças();





};


  }

  function move (cor){

    if(mouseIsPressed && mouseButton == LEFT){
      posMouse = createVector(mouseX,mouseY);
      findDama(cor);

      }







    attPeças();
  }

function attPeças(){

    for(i=0;i<12;i++){
      peça[i].branca();
      peça[i+12].preta();

    }

}


function findDama(cor){


if(cor){
  j=0;

}

else{

  j=12;
}

  for(i=0;i<12;i++){


    if(posMouse.x >= peça[i+j].pos.x && posMouse.x <= (peça[i+j].pos.x + 55) && posMouse.y >= peça[i+j].pos.y && posMouse.y <= (peça[i+j].pos.y + 55) ){
        peça[i+j].pos.set(mouseX-25,mouseY-25);
        return true;

    }




  }

  return false;

}
