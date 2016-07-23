$('document').ready(function(){
  gameboard.render();
  snake.render();
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
  }
}

snake = {
  render: function(){
    $("#"+this.getPosition(this.startingPosition)).addClass('snakeHead');
    // $("#"+this.bodyBuilder(this.startingPosition)).replaceWith(this.snakeBody);
  },
  startingPosition: [20, 20],
  currentDirection: '',
  getPosition: function(positionArray) {
    'positionArray'
    return positionArray.join('-');
  },
  moveSnake: function(){

      setTimeout(function(){
        console.log(`moveSnake: ${snake.startingPosition}`);
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
    this.startingPosition[0] -= 1;
    $("#"+this.getPosition(this.startingPosition)).addClass('snakeHead');
    this.currentDirection = 'up';
    this.moveSnake();
  },
  moveRight: function(){
    this.removeSnakeHead();
    this.startingPosition[1] += 1;
    $("#"+this.getPosition(this.startingPosition)).addClass('snakeHead');
    this.currentDirection = 'right';
    this.moveSnake();
  },
  moveDown: function(){
    this.removeSnakeHead();
    this.startingPosition[0] += 1;
    $("#"+this.getPosition(this.startingPosition)).addClass('snakeHead');
    this.currentDirection = 'down';
    this.moveSnake();
  },
  moveLeft: function(){
    this.removeSnakeHead();
    this.startingPosition[1] -= 1;
    $("#"+this.getPosition(this.startingPosition)).addClass('snakeHead');
    this.currentDirection = 'left';
    this.moveSnake();
  },
  removeSnakeHead: function(){
    // 'removeSnakeHead';
    $("#"+this.getPosition(this.startingPosition)).removeClass('snakeHead');
  },
  changeSnakeDirection: function(keypressed){
    switch (keypressed){
      case 38: //up
        this.moveUp();
        break;
      case 39: //right
        this.moveRight();
        break;
      case 40: //down
        this.moveDown();
        break;
      case 37: //left
        this.moveLeft();
        break;
    }
  }
}
