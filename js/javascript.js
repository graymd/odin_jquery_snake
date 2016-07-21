$('document').ready(function(){
  gameboard.render();
  snake.render();
});

gameboard = {
  singleGrid: '<div class="gamesquare"></div>',
  setFullGrid: function(){
    for (var i=0; i<40; i++){
      for (var j=0; j<40; j++){
      $('#gameboard').append('<div class="gamesquare" id='+i+''+j+'></div>');
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
    $("#"+getPosition(this.startingPosition)).replaceWith(this.snakeHead);
    $("#"+this.bodyBuilder(this.startingPosition)).replaceWith(this.snakeBody);
  },
  snakeHead: '<div class="snakeHead"></div>',
  snakeBody: '<div class="snakeBody"></div>',
  startingPosition: [20, 20],
  initialDirection: 'r',
  bodyBuilder: function(snakeHeadPosition){
    snakeHeadPosition[1] -= 1;
    console.log("snakeHead position: " +snakeHeadPosition);
    return getPosition(snakeHeadPosition);
  }
  // var currentSnake:
}

function getPosition(positionArray) {
  console.log('positionArray')
  return positionArray.join('');
}
