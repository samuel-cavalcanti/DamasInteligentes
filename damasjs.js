var tabuleiro;
var damaBranca;
var damaPreta;
var posXBranca = [];
var posYBranca = [];
var posXPreta  = [];
var posYPreta  = [];


function preload() {
  tabuleiro  = loadImage("tabuleiro.jpg");
  damaBranca =loadImage("damaBranca.png");
  damaPreta  =loadImage("damaPreta.png");
}
function startGame() {
  umNaoUmSim =true;
  xBranca =81;
  yBranca =25;

  xPreta = 25;
  yPreta = 305;


    for (i=0; i<12; i++) {
      posXBranca[i] = xBranca;
      posYBranca[i] = yBranca;
      posXPreta[i]  = xPreta;
      posYPreta[i]  = yPreta;
  
      xBranca += 112;
      xPreta += 112;
      
          if (i+1 %4 ==0) {
            yPreta += 56;
            yBranca += 56;
      
                if (umNaoUMSim) {
                  xBranca = 25;
                  xPreta  = 81; 
                  umNaoUmSim =false;
                }
          
                else {
                  xBranca = 81;
                  xPreta = 25;
                  umNaoUmSim = true;
                }
          }
    }
}






function setup() {
  createCanvas(500, 500);
  startGame();
}
function draw() {
  //x = 25; posX de baixo 305 posY 305
  // x =112;
  image(tabuleiro, 0, 0);
  image(damaBranca, posXBranca[0], posYBranca[0]);
}
