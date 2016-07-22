$('document').ready(function(){
  gameboard.render();
  snake.render();
  $('#searchbox input').bind('keypress', function(e) {
    console.log(e);
  });
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
  moveSnake: function(direction){
      setInterval(function(){
        console.log(snake.startingPosition);
        snake.moveRight();
      }, 2000);
  },
  moving: true,
  moveRight: function(){
    this.removeSnakeHead();
    this.startingPosition[1] += 1;
    this.startingPosition
    $("#"+this.getPosition(this.startingPosition)).addClass('snakeHead');
    console.log(this);
    this.moveSnake();
  },
  removeSnakeHead: function(){
    // 'removeSnakeHead';
    $("#"+this.getPosition(this.startingPosition)).removeClass('snakeHead');
  },
  changeSnakeDirection: function(keypressed){
    switch (keypressed){
      // case 38: //up
      //   this.moveUp();
      //   break;
      case 39: //right
        this.moveRight();
        break;
      // case 40 //down
      //   this.moveDown();
      //   break;
      // case 37: //left
      //   this.moveLeft();
      //   break;
    }
  }
}
