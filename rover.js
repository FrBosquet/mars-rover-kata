var myRover = {
  position: [0,0],
  direction: 'N'
};

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
    var x, y;
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);

    //The grid position can't be already occupied by an obstacle
    //The grid position can't be the starting position of the rover (0,0)
    if(grid[y][x] !== 'O' || !(y == 0 && x == 0)){
      grid[y][x] = 'O';
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
      console.log('Enter "front" or "back" to specify movement direction');
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
  if(grid[potentialPos[0]][potentialPos[1]] == 'O'){
    console.log("Cant't reach position: There is an obstacle in the way");

  }else{
    rover.position = potentialPos;
    console.log("New Rover Position: [" + rover.position[0] + ", " + rover.position[1] + "]")
  }

}

function moveForward(rover){
  console.log("> Move forward Rover");
  move(rover, 'front');
}

function moveBackward(rover){
  console.log("> Move backwards Rover");
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
      console.log('Enter "right" or "left" to specify turn direction');
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
  console.log('New Rover Direction: ' + rover.direction);
}

function turnRight(rover){
  console.log("> Turn right Rover");
  turn(rover, 'right');
}

function turnLeft(rover){
  console.log("> Turn left Rover");
  turn(rover, 'left');
}

// Programming orders

function followOrders(rover, orders){
  for(var i = 0; i < orders.length; i++){
    var currentOrderCode = orders[i];

    switch(currentOrderCode){
      case 'f':
        moveForward(myRover);
      break;
      case 'b':
        moveBackward(myRover);
      break;
      case 'r':
        turnRight(myRover);
      break;
      case 'l':
        turnLeft(myRover);
      break;
      default:
        console.log('Provide a valid order to follow');
      break;
    }
  }
}

//Setup grid with 15 obstacles
fillWithObstacles(15);
//Give orders to the rover
followOrders(myRover, 'fffrfflfffbb');
