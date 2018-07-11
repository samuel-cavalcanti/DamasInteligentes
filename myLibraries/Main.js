
var tabuleiro;
var checkers = new Checkers();

function preload() { // carregar imagens que serão utilizadas
  tabuleiro = loadImage("Images/tabuleiro.jpg");
  lightImage = loadImage("Images/damaBranca.png");
  darkImage = loadImage("Images/damaPreta.png");
}





function setup() {
  createCanvas(500, 500);
  
  checkers.start();


}

function draw() { 
  checkers.gameUpdate();

}


function mouseClicked() { // ao clicar
  checkers.mouseEvent();
 
}
