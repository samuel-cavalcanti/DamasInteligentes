var tabuleiro;


function preload() {
    tabuleiro = loadImage("tabuleiro.jpg");
    damaBranca = loadImage("damaBranca.png");
    damaPreta = loadImage("damaPreta.png");
}






function setup() {
    createCanvas(500, 500);
    image(tabuleiro, 0, 0);
    startGame();


}

function draw() {




}
