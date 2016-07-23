$('document').ready(function(){
  gameboard.render();
  snake.render();
  food.render();
});

document.onkeydown = function(e) {
    e = e || window.event;
    console.log(e.keyCode);
    snake.changeSnakeDirection(e.keyCode);
  }

gameboard = {
  singleGrid: '<div class="gamesquare"></div>',
  setFullGrid: function(){
    for (var i=0; i<40; i++){
      for (var j=0; j<40; j++){
      $('#gameboard').append('<div class="gamesquare" id='+i+'-'+j+'></div>');
      }
    }
    $('#gameboard').append(snake.render());
  },
  render: function(){
    return this.setFullGrid();
  },
  getPosition: function(positionArray) {
    'positionArray'
    return positionArray.join('-');
  },

}

snake = {
  headPosition: [20, 20],
  fullSnake: [[20, 20]],
  render: function(){
    let [head, ...body] = this.fullSnake;
    console.log(head);
    console.log(body);
    $("#"+gameboard.getPosition(head)).addClass('snakeHead');
    for (let partPosition of body){
      $("#"+gameboard.getPosition(partPosition)).addClass('snakeBody');
    }
    // $("#"+this.bodyBuilder(this.headPosition)).replaceWith(this.snakeBody);
  },

  addSnakeBodyPiece(){
    let fullSnake = this.fullSnake;
    let newSnakeBodyPartPosition = [...fullSnake[fullSnake.length - 1]];
    if (this.currentDirection === 'up'){
      newSnakeBodyPartPosition[0] +=1;
    }
    else if (this.currentDirection === 'right'){
      newSnakeBodyPartPosition[1] -=1;
    }
    else if (this.currentDirection === 'down'){
      newSnakeBodyPartPosition[0] -=1;
    }
    else if (this.currentDirection === 'left'){
      newSnakeBodyPartPosition[1] +=1;
    }
    fullSnake.push(newSnakeBodyPartPosition);
  },
  currentDirection: '',
  moveSnake: function(){
      setTimeout(function(){
        console.log(`moveSnake: ${snake.headPosition}`);
        if (snake.currentDirection === 'up'){
          snake.moveUp()
        }
        else if (snake.currentDirection === 'right'){
          snake.moveRight()
        }
        else if (snake.currentDirection === 'down'){
          snake.moveDown()
        }
        else if (snake.currentDirection === 'left'){
          snake.moveLeft()
        }
      }, 2000);
  },
  moving: true,
  moveUp: function(){
    this.removeSnakeHead();
    this.headPosition[0] -= 1;
    $("#"+gameboard.getPosition(this.headPosition)).addClass('snakeHead');
    this.checkInPlay();
    this.currentDirection = 'up';
    this.moveSnake();
  },
  moveRight: function(){
    this.removeSnakeHead();
    this.headPosition[1] += 1;
    $("#"+gameboard.getPosition(this.headPosition)).addClass('snakeHead');
    this.checkInPlay();
    this.currentDirection = 'right';
    this.moveSnake();
  },
  moveDown: function(){
    this.removeSnakeHead();
    this.headPosition[0] += 1;
    $("#"+gameboard.getPosition(this.headPosition)).addClass('snakeHead');
    this.checkInPlay();
    this.currentDirection = 'down';
    this.moveSnake();
  },
  moveLeft: function(){
    this.removeSnakeHead();
    this.headPosition[1] -= 1;
    $("#"+gameboard.getPosition(this.headPosition)).addClass('snakeHead');
    this.checkInPlay();
    this.currentDirection = 'left';
    this.moveSnake();
  },
  removeSnakeHead: function(){
    // 'removeSnakeHead';
    $("#"+gameboard.getPosition(this.headPosition)).removeClass('snakeHead');
  },
  changeSnakeDirection: function(keypressed){
    switch (keypressed){
      case 38: //up
        if (this.currentDirection != 'up'){
          this.moveUp();
        }
        break;
      case 39: //right
        if (this.currentDirection != 'right'){
          this.moveRight();
        }
        break;
      case 40: //down
        if (this.currentDirection != 'down'){
          this.moveDown();
        }
        break;
      case 37: //left
        if (this.currentDirection != 'left'){
          this.moveLeft();
        }
        break;
    }
  },
  checkInPlay(){
    if (this.headPosition[0] < 0 || this.headPosition[0] > 39 || this.headPosition[1] < 0 || this.headPosition[1] > 39){
      alert('game over!');
      location.reload();
    }
  }
}

food = {
  render(){
    this.setPosition();
    $("#"+gameboard.getPosition(this.position)).addClass('food');
  },
  setPosition(){
    this.position[0] = getRandomIntInclusive(0, 39);
    this.position[1] = getRandomIntInclusive(0, 39);
  },
  position: [],
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
