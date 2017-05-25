/*
funções que mexem com o tabuleiro estão em tabuleiro.js
objeto dama e funções referentes a ela, estão em Dama.js
funções relacionadas ao funcionamento do jogo estão em gameFunctions.js
*/
var tabuleiro;
var game = new GameFunctions();

function preload() { // carregar imagens que serão utilizadas
  tabuleiro = loadImage("Images/tabuleiro.jpg");
  damaBranca = loadImage("Images/damaBranca.png");
  damaPreta = loadImage("Images/damaPreta.png");
}






function setup() {
  createCanvas(500, 500);
  game.start();


}

function draw() {
  image(tabuleiro, 0, 0);
  game.goingON();









}
