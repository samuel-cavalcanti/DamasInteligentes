function setPeças() {
  xBranca = 81;
  yBranca = 25;
  xPreta = 25;
  yPreta = 305;
  umNãoUmSim = true;



  for (i = 0; i < 12; i++) { // adicionando posições iniciais
    peça[i].pos.add(xBranca, yBranca);
    peça[i + 12].pos.add(xPreta, yPreta);

    xBranca += 112;
    xPreta += 112;

    if ((i + 1) % 4 == 0) {
      yBranca += 56;
      yPreta += 56;

      if (umNãoUmSim) {
        xBranca = 25;
        xPreta = 81;
        umNãoUmSim = false;
      } else {
        xBranca = 81;
        xPreta = 25;
      }




    }
  }
}

function updatePieces() { // atualiza as imagens das damas

  for (i = 0; i < 12; i++) {
    peça[i].branca();
    peça[i + 12].preta();

  }

}

function validPos(x,y) {

  contadorDePosições = 0; // conta posições validas
  contadorDeVitimas = 0; // conta o numero de vítimas
  listadeVitimas = [];
  listadePosições = [];
  quadrado = 56; // tamanho aprox do quadado da imagem, tamanho real: 56x57
  // posAtual  está em gameFunctions e reprovadaPos tb !!
  finalDoTabuleiro = 417; // final do tabuleiro
  inicioDoTabuleiro = 25; //  inicio do tabuleiro
  all = -1;
  twoEnemy = false;



  if (cor) { // se for a vez das brancas

    possibleMoves(x + quadrado, y + quadrado);
      twoEnemy = false;
    possibleMoves(x - quadrado, y + quadrado);
      twoEnemy = false;
    rearMove(x + quadrado, y - quadrado);
      twoEnemy = false;
    rearMove(x - quadrado, y - quadrado);

  } else { // se for as  vez das pretas

    possibleMoves(x - quadrado, y - quadrado);
      twoEnemy = false;
    possibleMoves(x + quadrado, y - quadrado);
      twoEnemy = false;
    rearMove(x + quadrado, y + quadrado);
      twoEnemy = false;
    rearMove(x - quadrado, y + quadrado);

  }


  for (i = 0; i < listadePosições.length; i++) {
    if (detectObject(mouseX, mouseY, listadePosições[i][0], listadePosições[i][1], quadrado)) {
      peça[escolhido].pos.set(listadePosições[i][0], listadePosições[i][1]);

      for (j = 0; j < listadeVitimas.length; j++) {
        if (x - peça[listadeVitimas[j]].pos.x  == - (peça[escolhido].pos.x -peça[listadeVitimas[j]].pos.x) && y - peça[listadeVitimas[j]].pos.y  == - (peça[escolhido].pos.y -peça[listadeVitimas[j]].pos.y) )
          peça[listadeVitimas[j]].pos.set(Infinity, Infinity);


      }
      return true;
    }


  }



  peça[escolhido].pos = posAtual;
  return false;
}

function possibleMoves(x, y) { // verifica possiveis jogadas em uma direção

  if (x > finalDoTabuleiro || y > finalDoTabuleiro || x < inicioDoTabuleiro || y < inicioDoTabuleiro)
    return;
  // all == -1
  else if (checkPosition(x, y, all)) { // Tem alguma peça ? , caso não tenha
    listadePosições[contadorDePosições] = [x, y];
    contadorDePosições++;
    if (twoEnemy) {
      listadeVitimas[contadorDeVitimas] = possívelvitima;
      contadorDeVitimas++; // ASSASSINO !
      twoEnemy = false;
    }
  } else if (!checkPosition(x, y, cor) && !twoEnemy) { // essa peça é inimiga ? , caso sim
    twoEnemy = true;
    possívelvitima = vitima;
    possiblesSearches(x, y); // 4 posibilidades de buscas


  }



}

function rearMove(x, y) {
  print("rearMove: "+ x +" " + y + "twoEnemy: "+ twoEnemy);
  if (x > finalDoTabuleiro || y > finalDoTabuleiro || x < inicioDoTabuleiro || y < inicioDoTabuleiro)
    return;

  if (!checkPosition(x, y, cor) && !twoEnemy) { // essa peça é inimiga ? , caso sim
    print("rearMove checkPosition");
    twoEnemy = true;
    possívelvitima = vitima;
    possiblesSearches(x, y); // 4 posibilidades de buscas


  }
}

function checkPosition(posiçãoX, posiçãoY, tipo) { // true == posição vazia , false posição está prenechida


  if (tipo == 1) { // procura pelas pretas
    inicial = 12;
    final = 24;
  } else if (tipo == 0) { // procura pelas brancas
    inicial = 0;
    final = 12;
  } else if (tipo == -1) { // procura por todas as peças
    inicial = 0;
    final = 24;
  } else if (tipo != 0 && tipo != 1 && tipo != -1) // você fe merda, corriga.
    alert("Erro no tipo");

  for (i = inicial; i < final; i++) {

    if (posiçãoX == peça[i].pos.x && posiçãoY == peça[i].pos.y && escolhido != i) {
      vitima = i;
      return false;
    }
  }


  return true;
}


function possiblesSearches(x, y) {
  print("passou 1");
  print("x: " + x + " y: " + y + " posAtual: " + posAtual);
  if (x > posAtual.x)
    x += quadrado;
  else
    x -= quadrado;
  if (y > posAtual.y)
    y += quadrado;
  else
    y -= quadrado;

  possibleMoves(x, y);

}



function detectObject(x, y, x1, y1, tam) { // detecta se  o objeto x0, y0 está dentro de x1,y1
  if (x >= x1 && x <= x1 + tam && y > y1 && y < y1 + tam)
    return true;

  else
    return false;

}



function detectObject2(peça, novaPos, tam) { // detecta se  o objeto x0, y0 está dentro de x1,y1
  if (novaPos.x >= peça.x && novaPos.x <= (peça.x + tam) && novaPos.y >= peça.y && novaPos.y <= (peça.y + tam) || (novaPos.x + tam) >= peça.x && (novaPos.x + tam) <= (peça.x + tam) && (novaPos.y + tam) >= peça.y && (novaPos.y + tam) <= (peça.y + tam))
    return true;

  else
    return false;

}
