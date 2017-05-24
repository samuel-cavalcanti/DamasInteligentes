
function createTabuleiro() {

  for (var i = 0; i < 8; i++) {
    Tabuleiro[i] = [];
    for (var j = 0; j < 8; j++) {
      Tabuleiro[i][j] = new Casa;
    }
  }

  addCasasPos();
}

function addCasasPos() {

  inicialX = 25;
  inicialY = 25;

  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      Tabuleiro[i][j].pos = [inicialX, inicialY];
      inicialX += 56;
    }
    inicialY += 56;
    inicialX = 25;

  }


}


function startDamas() {
  simNão = false;
  nPeças = 0;


  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {

      if (i % 2 == 0) {

        if (simNão) {
          if (i != 4) {
            Tabuleiro[i][j].addDama(peça[nPeças]);
            nPeças++;
          }
          simNão = false;
        } else
          simNão = true;


      } else {
        if (!simNão) {
          if (i != 3) {
            Tabuleiro[i][j].addDama(peça[nPeças]);
            nPeças++;

          }

          simNão = true;

        } else
          simNão = false;


      }


    }


  }

}
