var tabuleiro;
var game = new GameFunctions ();

function preload() {
    tabuleiro = loadImage("Images/tabuleiro.jpg");
    damaBranca = loadImage("Images/damaBranca.png");
    damaPreta = loadImage("Images/damaPreta.png");
}






function setup() {
    createCanvas(500, 500);
    game.start();


}

function draw() {
  game.goingON();




}
