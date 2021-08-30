var bg,bgIMG;
var player,player_running,player_jumping1,player_jumping2;
var invisibleGround;
var ringIMG,ringGroup;
var plantIMG,plantGroup;
var score = 0;
var gameState = "play"
var resetIMG,reset;


function preload(){
  bgIMG=loadImage("images/wallpaper.png")
  player_running=loadAnimation("images/running1.png","images/running2.png","images/running3.png","images/running4.png"
  ,"images/running5.png","images/running6.png","images/running7.png","images/running8.png")

  player_jumping1=loadAnimation("images/jump1.png")
  player_jumping2=loadAnimation("images/jump2.png")

  ringIMG=loadImage("images/ring.png")

  plantIMG=loadImage("images/plant.png")

  resetIMG=loadImage("images/reset.png")
  }
function setup() {
  createCanvas(1000,600);
  bg=createSprite(900, 200, 50, 50);
  bg.addImage(bgIMG);
 
  bg.scale=2;
  
 
  player=createSprite(80,350,20,20);
  player.debug=false;
  player.setCollider("rectangle",0,0,10,10);
  player.addAnimation("player",player_running);
  player.addAnimation("jumping1",player_jumping1);
  player.addAnimation("jumping2",player_jumping2);


   player.scale=0.8;

  invisibleGround=createSprite(400,400,900,20);
  invisibleGround.visible=false;

  reset = createSprite(500,300,50,50)
  reset.addImage(resetIMG);
  reset.visible=false;
  reset.scale=0.3

  ringGroup=new Group();
  plantGroup=new Group();

  
}


function draw() {
  background(bgIMG);  

  if (gameState === "play"){
   // bg.velocityX=-3;
   bg.velocityX=-(4 + 3* score/100)
    if(bg.x<=0){
      bg.x=400;
    }

  //jump when the space key is pressed
 if(keyDown("space")&& player.y >= 100) {
  player.velocityY = -12; 
}
//add gravity
player.velocityY = player.velocityY + 0.8

score = score + Math.round(getFrameRate()/60);

reset.visible=false;

if(player.collide(invisibleGround)){
  player.changeAnimation("player",player_running)
}

if(player.isTouching(ringGroup)){
  ringGroup.destroyEach()
  score = score + 75;
}

spawnRings();
spawnPlant();
if(player.isTouching(plantGroup)){
  gameState = "end";
}
 }

if(gameState === "end"){
  ringGroup.destroyEach();
  plantGroup.destroyEach();
  plantGroup.setVelocityXEach(0)
  ringGroup.setVelocityXEach(0);
  bg.velocityX = 0;
  player.velocityY = 0;
  reset.visible=true;
  text("GAME OVER!!",400,300);
if(mousePressedOver(reset)){
  gameState ="play";
  score=0;
}
}

  
  drawSprites();
  textSize(30);
  stroke("white")
  fill("white")
 text("Score : "+score ,800,50);
}

function spawnRings(){
  if(frameCount%350==0){
    var ring=createSprite(1100,200,40,40);
    ring.y = Math.round(random(30,350));
    ring.addImage(ringIMG);
    ring.scale=0.2;
    ring.velocityX=-3;
    ring.depth = player.depth;
    player.depth = player.depth + 1;
    ringGroup.add(ring);
  }   
}

function spawnPlant(){
  if(frameCount%100===0){
    var plant=createSprite(1100,400,40,40);
   
    plant.addImage(plantIMG);
    plant.scale=0.33;
    plant.velocityX=-(3.5+score/100);
    plant.lifetime=300;
    plantGroup.add(plant);
  }   
}
