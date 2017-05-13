var myRovers = [];

function Rover(position, name, direction){
  this.position = position;
  this.name = name;
  this.direction = direction;
  this.landAnywhere = function(){
    var landingPos;
    var occupied;

    //Assign random position till the the position is not occupied
    do{
      landingPos = randomPosition();
      occupied = (obstacleInTheWay(landingPos) || roverInTheWay(landingPos));
    }while(occupied);

    this.position = landingPos;
    console.log(this.name, "landed at", landingPos);
  }
}

var directions = ['N', 'E', 'S', 'W'];

// Grid array
//   filled with "E" for empty spot;
//   filled with "O" for obstacle spot;
var grid = new Array(10);
for(var i= 0; i<10; i++){
  grid[i] = new Array(10).fill('E');
}

// Random obstacles in the grid
function fillWithObstacles(totalObstacles){
  var i = 0;

  while(i < totalObstacles){
    // Random position
    rndPos = randomPosition();
    var y = rndPos[0];
    var x = rndPos[1];

    //The grid position can't be already occupied by an obstacle
    //The grid position can't be the starting position of the rover (0,0)
    if(!obstacleInTheWay(rndPos) || !roverInTheWay(rndPos)){
      grid[y][x] = 'O';
      console.log("New obstacle at", rndPos);
      i++;
    }
  }
}

// Movement orders
function move(rover, direction) {
  var modifier;

  switch(direction){
    case 'front':
      modifier = 1;
    break;
    case 'back':
      modifier = -1;
    break;
    default:
      console.error('Enter "front" or "back" to specify movement direction');
      return;
    break;
  }

  //Copy position values, not reference
  var potentialPos = rover.position.slice(0);

  switch(rover.direction) {
    case 'N':
      potentialPos[0]+= modifier;
      break;
    case 'E':
      potentialPos[1]+= modifier;
      break;
    case 'S':
      potentialPos[0]-= modifier;
      break;
    case 'W':
      potentialPos[1]-= modifier;
      break;
  };

  // Check if potential position is within grid limits
  if(potentialPos[0]<0) potentialPos[0] = 9;
  if(potentialPos[1]<0) potentialPos[1] = 9;
  if(potentialPos[0]>9) potentialPos[0] = 0;
  if(potentialPos[1]>9) potentialPos[1] = 0;

  // Check if potential position is blocked by an obstacle
  if(obstacleInTheWay(potentialPos)){
    console.warn("Can't reach position: There is an obstacle in the way");

  }else if(roverInTheWay(potentialPos)){
    console.warn("Can't reach position: There is another rover in the way");

  }else{
    rover.position = potentialPos;
    console.log("New " + rover.name + " Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
  }
}

function moveForward(rover){
  console.log("> Move forward", rover.name);
  move(rover, 'front');
}

function moveBackward(rover){
  console.log("> Move backwards", rover.name);
  move (rover, 'back');
}

// Turn orders
function turn(rover, direction){
  var indexModifier;

  switch(direction){
    case 'right':
      indexModifier = 1;
    break;
    case 'left':
      indexModifier = -1;
    break;
    default:
      console.error;('Enter "right" or "left" to specify turn direction');
      return;
    break;
  }

  //Look in the directions array for the current index
  var currentIndex = directions.indexOf(rover.direction);
  var newIndex = currentIndex + indexModifier;

  //Kept the index within the direction array's length
  if(newIndex > directions.length){
    newIndex = 0;
  }else if(newIndex < 0){
    newIndex = directions.length -1;
  }

  // Assign new direction
  rover.direction = directions[newIndex];
  console.log('New ' + rover.name + ' Direction: ' + rover.direction);
}

function turnRight(rover){
  console.log("> Turn right", rover.name);
  turn(rover, 'right');
}

function turnLeft(rover){
  console.log("> Turn left", rover.name);
  turn(rover, 'left');
}

// Check wether there is a rover in a position
function roverInTheWay(position){
  myRovers.forEach(function(rover){
    if(rover.position[0] == position[0] && rover.position[1] == position[1]){
      //There is a rover in the way
      return true;
    }
  });

  //No rover in the way
  return false;
}

// Check wether there is an obstacle in a position
function obstacleInTheWay(position){
  if(grid[position[0]][position[1]] == 'O'){
    // There is an obstacle in the way
    return true;
  }else{
    // No obstacles in the way
    return false;
  }
}

// Programming orders

function followOrders(rover, orders){
  for(var i = 0; i < orders.length; i++){
    var currentOrderCode = orders[i];

    switch(currentOrderCode){
      case 'f':
        moveForward(rover);
      break;
      case 'b':
        moveBackward(rover);
      break;
      case 'r':
        turnRight(rover);
      break;
      case 'l':
        turnLeft(rover);
      break;
      default:
        console.log('Provide a valid order to follow');
      break;
    }
  }
}

//Returns a random position in the grid
function randomPosition(){
  var x, y;
  x = Math.floor(Math.random() * 10);
  y = Math.floor(Math.random() * 10);

  return [y,x];
}

//Setup grid with 15 obstacles
fillWithObstacles(15);
//Create two rovers
myRovers.push(new Rover([0,0], "First rover in mars", 'N'));
myRovers.push(new Rover([0,0], "Second rover in mars", 'N'));
//Land the rovers in the planet
myRovers[0].landAnywhere();
myRovers[1].landAnywhere();
//Give orders to the rovers;
followOrders(myRovers[0], 'fffrfflfffbb');
followOrders(myRovers[1], 'rfflffrblrff');
