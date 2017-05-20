var tabuleiro;


function preload() {
    tabuleiro = loadImage("Images/tabuleiro.jpg");
    damaBranca = loadImage("Images/damaBranca.png");
    damaPreta = loadImage("Images/damaPreta.png");
}






function setup() {
    createCanvas(500, 500);
    image(tabuleiro, 0, 0);
    startGame();


}

function draw() {




}
