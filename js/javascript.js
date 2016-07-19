$('document').ready(function(){
  gameboard.render();
  snake.render();
});

gameboard = {
  singleGrid: '<div class="gamesquare"></div>',
  setFullGrid: function(){
    for (var i=0; i<40; i++){
      for (var j=0; j<40; j++){
      $('#gameboard').append('<div class="gamesquare" id=y'+i+'x'+j+'></div>');
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
    return $('#y20x20').replaceWith(this.snakeHead);
  },
  snakeHead: '<div class="snakeHead gamesquare">0</div>',
  snakeBody: '<div class="snakeBody">X</div>',
  startingPosition: [20, 20],
  initialDirection: 'r'
  // var currentSnake:
}
