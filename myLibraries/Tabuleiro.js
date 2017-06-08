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


function detectObject2(peça, novaPos, tam) { // detecta se  o objeto x0, y0 está dentro de x1,y1
  if (novaPos.x >= peça.x && novaPos.x <= (peça.x + tam) && novaPos.y >= peça.y && novaPos.y <= (peça.y + tam) || (novaPos.x + tam) >= peça.x && (novaPos.x + tam) <= (peça.x + tam) && (novaPos.y + tam) >= peça.y && (novaPos.y + tam) <= (peça.y + tam))
    return true;

  else
    return false;

}



function validPos() {


  listadeVitimas  = [];
  listadePosições = [];
  quadrado = 56; // tamanho aprox do quadado da imagem, tamanho real: 56x57
  // posAtual  está em gameFunctions e reprovadaPos tb !!

  finalDoTabuleiro = 473; // final do tabuleiro
  inicioDoTabuleiro = 25; //  inicio do tabuleiro


  if (mouseX > finalDoTabuleiro || mouseY > finalDoTabuleiro || mouseX < inicioDoTabuleiro || mouseY < inicioDoTabuleiro) {
    peça[escolhido].pos = posAtual;
    return false;

  } else if (cor) { // vez das brancas
    if (detectObject(mouseX, mouseY, posAtual.x + quadrado, posAtual.y + quadrado, quadrado) && checkPosition( posAtual.x + quadrado,posAtual.y + quadrado, -1) ) {
      posAtual.add(quadrado, quadrado); // se clicar no quadado (certo) a direita

    } else if (detectObject(mouseX, mouseY, posAtual.x - quadrado, posAtual.y + quadrado, quadrado) && checkPosition( posAtual.x - quadrado,posAtual.y + quadrado, -1) ) {
      posAtual.add(-quadrado, quadrado); // se clicar no quadrado (certo) a esquerda

    } else {
      peça[escolhido].pos = reprovadaPos; // se não for pra direita ou esquerda
      return false;
    }


  } else { // vez das pretas
    if (detectObject(mouseX, mouseY, posAtual.x + quadrado, posAtual.y - quadrado, quadrado) && checkPosition( posAtual.x + quadrado,posAtual.y - quadrado, -1) ) {
      posAtual.add(quadrado, -quadrado); // se clicar no quadado (certo) a direita

    } else if (detectObject(mouseX, mouseY, posAtual.x - quadrado, posAtual.y - quadrado, quadrado) && checkPosition( posAtual.x - quadrado,posAtual.y - quadrado, -1) ) {
      posAtual.add(-quadrado, -quadrado); // se clicar no quadrado (certo) a esquerda


    } else {
      peça[escolhido].pos = reprovadaPos; // se não for pra direita ou esquerda
      return false;

    }



  }

  peça[escolhido].pos = posAtual;
  return true;

}

function detectObject(x0, y0, x1, y1, tam) { // detecta se  o objeto x0, y0 está dentro de x1,y1
  if (x1 >= x0 && x1 <= (x0 + tam) && y1 >= y0 && y1 <= (y0 + tam) || (x1 + tam) >= x0 && (x1 + tam) <= (x0 + tam) && (y1 + tam) >= y0 && (y1 + tam) <= (y0 + tam))
    return true;

  else
    return false;

}

function checkPosition(posiçãoX, posiçãoY, tipo) {


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


function updatePieces() { // atualiza as imagens das damas

  for (i = 0; i < 12; i++) {
    peça[i].branca();
    peça[i + 12].preta();

  }

}

function teste (x){
   if (! checkPosition( posAtual.x + x*quadrado,posAtual.y + x*quadrado, -1) ){
      listadeVitimas[x-1]= vitima;
      listadePosições[x-1].push() 
      teste(x+x);
   }
}
