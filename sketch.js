var PLAY = 1;
var END = 0;
var gameState = PLAY;
var tower, towerImage;
var ghost, ghostImage;
var gameOver, gameOverImage;
var restart, restartImage;
var climber, climberImage;
var door, doorImage, doorGroup;
var invisbleBlock;
var score;

function preload(){
towerImage = loadImage("tower.png");
ghostImage = loadAnimation("ghost-jumping.png","ghost-standing.png");
doorImage = loadImage("door.png");
climberImage = loadImage("climber.png");
gameOverImage = loadImage("gameOver.jpg");
restartImage = loadImage("restart.jpg");
spookySound = loadSound("spooky.wav");

}

function setup(){
  
createCanvas(600,600)
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
  tower = createSprite(300,0,600,600);
  tower.addImage(towerImage);
  tower.velocityY = 6

  ghost = createSprite(300,300,10,10);
  ghost.addAnimation("Moving", ghostImage);
  ghost.scale = 0.4 
  

  gameOver = createSprite (390,390,15,15);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.3
  
  restart = createSprite (370,370,15,15);
  restart.addImage(restartImage);
  restart.scale = 0.3

  score = 0;
}

function draw() {
  background ("brown");
  
  
  if (gameState === PLAY){
    gameOver.visible = false;
    restart.visible = false;
    
    
    score = score + (Math.round (getFrameRate () / 60));
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    
    if(keyDown("space")&& ghost.y >= 100) {
          ghost.velocityY = -12;
  } 

    ghost.velocityY = ghost.velocityY + 0.5;

    //console.log(tower.y)
  if (tower.y > 600){
  tower.y = 300
  }
    spawnDoors()
    
    if (climbersGroup.isTouching (ghost)){
      ghost.velocityY = 0;
    }
    
    if (invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
       gameState = END;
    }
    
  }
   else if (gameState === END){
     gameOver.visible = true;
     restart.visible = true;
     tower.velocityY = 0;
     
     doorsGroup.setLifetimeEach(-1)
     climbersGroup.setLifetimeEach(-1)
     invisibleBlockGroup.setLifetimeEach(-1)
     
      //if(mousePressedOver(restart)) {
      //reset();
    //}
   }
  
  
  
  
 

  drawSprites()
  text ("SCORE: " + score, 500,50);
  
  }

function spawnDoors(){
  
  if (frameCount % 60 === 0 ) {
  door = createSprite(400,100,15,15);
    door.addImage(doorImage);
  door.velocityY =  5
  door.x = Math.round(random(100, 500));
  door.lifetime = 800;
    
  climber = createSprite(400,150,15,15);
  climber.addImage(climberImage);
  climber.velocityY = 5    
  climber.x = door.x
    
  invisibleBlock = createSprite(400,160,20,20);
  invisibleBlock.velocityY = 5
  invisibleBlock.x = door.x
  invisibleBlock.width = climber.width
  invisibleBlock.visible = false;
  invisibleBlock.debug = true;
  
    
    door.depth = ghost.depth
    climber.depth = ghost.depth
    ghost.depth = ghost.depth + 1 
    
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);

}
}

/*function reset()
{
  gameState = PLAY
  gameOver.visible = false
  restart.visible = false

  doorsGroup.destroyEach()
  climbersGroup.destroyEach()
  invisibleBlockGroup.destroyEach()
  score = 0;
}*/