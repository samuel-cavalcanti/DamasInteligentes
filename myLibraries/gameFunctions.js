var peça = [];
function updatePieces(){ // atualiza as imagens das damas

    for(i=0;i<12;i++){
      peça[i].branca();
      peça[i+12].preta();

    }

}
function move (cor){

  if(mouseIsPressed && mouseButton == LEFT){
    posMouse = createVector(mouseX,mouseY); // pegando posição x e y do mouse
    findDama(cor);

    }

}
function findDama(cor){ // encontrar a dama  que você clicou em cima, se não clicou nela, não acontece nada
  if(cor){ // se eu estiver procurando  entre as damas brancas  j =0 , peças brancas = pela[i], com i , 0<= i < 12
    j=0;

  }

  else{  // se não, procuro entre as pretas, as peças pretas são peça[i], com i ,11 < i < 24

    j=12;
  }

    for(i=0;i<12;i++){


      if(posMouse.x >= peça[i+j].pos.x && posMouse.x <= (peça[i+j].pos.x + 55) && posMouse.y >= peça[i+j].pos.y && posMouse.y <= (peça[i+j].pos.y + 55) ){
          peça[i+j].pos.set(mouseX-25,mouseY-25); // a peça vencedora gruda no mouse equando estiver clicando
          return true;

      }




    }

    return false;

}


function GameFunctions (){

this.start = function() { // começa o jogo , chamando as peças  e setando posições iniciais
  xBranca = 81;
  yBranca = 25;
  xPreta  = 25;
  yPreta  = 305;
  umNãoUmSim = true;

  for(i=0;i<12;i++){ // chamando as peças

    peça[i] = new Dama();
    peça[12+i] = new Dama();
  }



  for(i=0;i<12;i++){ // setando posições iniciais
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





};

this.goingON = function (){
  image(tabuleiro, 0, 0);

  move(0); // zero para preto, 1 para branco

  updatePieces();





};


  }
