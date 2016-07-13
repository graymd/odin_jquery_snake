$('document').ready(function(){
  gameboard.render();

});

gameboard = {
  singleGrid: '<div class="gamesquare"></div>',
  setFullGrid: function(){
    for (var i=0; i<40; i++){
      for (var j=0; j<40; j++){
      $('#gameboard').append(this.singleGrid);
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
    return this.snakeHead + this.snakeBody;
  },
  snakeHead: '<div class="snakeHead">0</div>',
  snakeBody: '<div class="snakeBody">X</div>'
  startingPosition: [20, 20],
  initialDirection: 'r',
  var currentSnake:

}
