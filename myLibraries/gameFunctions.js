var peça = [];

function startGame() {
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
    peça[i].posDama.add(xBranca,yBranca);
    peça[i+12].posDama.add(xPreta,yPreta);

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

  for(i=0;i<12;i++){
    peça[i].branca();
    peça[i+12].preta();

  }


}
