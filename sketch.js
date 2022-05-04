

var rock,rockImg;
var paper,paperImg;
var scissors,scissorsImg;
var tower,towerImg;
var randomNum;
var score = 0;
var gameState = "PLAY"
var paperGroup;
var scissorsGroup;

function preload(){
  towerImg = loadImage ("Images/tower.png");
  rockImg = loadImage ("Images/Rock.gif");
  paperImg = loadImage ("Images/Paper.gif");
  scissorsImg = loadImage ("Images/Scissors.gif");  
}

function setup() {
  createCanvas(600, 600);

  drawSprites ()
    
  tower = createSprite (300,300)
  tower.addImage("tower",towerImg)
  tower.velocityY = 1

  rock = createSprite (300,490)
  rock.addImage("rock1",rockImg)
  rock.scale = 0.3
  
  paperGroup = createGroup ()
  scissorsGroup = createGroup ()
}



function draw() {
  background(200);

  drawSprites ()

  if (gameState == "PLAY") {

    if (tower.y > 400) {
      tower.y = 300
    }
  
    rock.velocityY = rock.velocityY + 0.5
    
    if (keyDown("space")) 
    {
      rock.velocityY = -10
    }
  
    if (keyDown("left")) 
    {
      rock.x = rock.x - 5
    }
  
    if (keyDown("right"))
    {
      rock.x = rock.x + 5
    }

    if (rock.isTouching(scissorsGroup)) {
      score = score + 1
    }

    fill ("black")
    textSize (20)
    text ("Score: " + score,390,20)
    
    obstacles ()
  }

  if (rock.y > 600 || paperGroup.isTouching(rock)) {
    gameState = "END"
  }

  if (gameState === "END") {
    paperGroup.destroyEach()
    scissorsGroup.destroyEach()
    background ("black")
    fill ("yellow")
    text ("Game Over!", 250,300) 
    score.visible = false
    rock.velocityY = 0
  }

}

function obstacles () {

  if (frameCount % 150 == 0) {

    paper = createSprite (200,-10)
    paper.x = Math.round(random(100,400))
    paper.addImage ("paper1",paperImg)
    paper.scale= 0.3
    paper.velocityY = 3
    
    scissors = createSprite (200,-90)
    scissors.x = Math.round(random(100,400))
    scissors.addImage ("scissors",scissorsImg)
    scissors.scale = 0.2
    scissors.velocityY = 3

    paperGroup.add (paper)
    scissorsGroup.add (scissors)
  }
}
