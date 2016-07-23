$('document').ready(function(){
  gameboard.render();
  food.render();
  // snake.render();

});

document.onkeydown = function(e) {
    e = e || window.event;
    console.log(e.keyCode);
    snake.changeSnakeDirection(e.keyCode);
  }

gameboard = {
  singleGrid: '<div class="gamesquare"></div>',
  setFullGrid(){
    for (var i=0; i<40; i++){
      for (var j=0; j<40; j++){
      $('#gameboard').append('<div class="gamesquare" id='+i+'-'+j+'></div>');
      }
    }
    // $('#gameboard').append(snake.render());
  },
  render(){
    this.setFullGrid();
    snake.render();
  },
  getPosition(positionArray) {
    return positionArray.join('-');
  },

}

snake = {
  fullSnake: [[20, 20]],
  render(){
    let [head, ...body] = snake.fullSnake;
    this.checkInPlay(head);
    snake.removeSnakeHead();
    snake.removeSnakeBody();
    $("#"+gameboard.getPosition(head)).addClass('snakeHead');
    if(body){
      for (let partPosition of body){
        $("#"+gameboard.getPosition(partPosition)).addClass('snakeBody');
      }
    }
    setTimeout(function(){
      snake.moveSnakeBody();
      snake.moveSnake(head);
      console.log(head);
      snake.render();
    }, 2000);
  },
  // moveSnakeBody(){
  //   fullSnake = this.fullSnake;
  //     if (fullSnake.length > 1) {
  //     fullSnake.unshift(fullSnake[0]);
  //     console.log(`full snake ${this.fullSnake[0]}`)
  //     fullSnake.pop();
  // }
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
  moveSnake(head){
      //should check if there is a new direction or same current directionßß
      if (snake.currentDirection === 'up'){
        snake.moveUp(head)
      }
      else if (snake.currentDirection === 'right'){
        snake.moveRight(head)
      }
      else if (snake.currentDirection === 'down'){
        snake.moveDown(head)
      }
      else if (snake.currentDirection === 'left'){
        snake.moveLeft(head)
      }
  },
  moveUp(head){
    head[0] -= 1;
  },
  moveRight(head){
    head[1] += 1;
  },
  moveDown(head){
    head[0] += 1;
  },
  moveLeft(head){
    head[1] -= 1;
  },
  removeSnakeHead(){
    $(".gamesquare").removeClass('snakeHead');
  },
  removeSnakeBody(){
    $(".gamesquare").removeClass('snakeBody');
  },
  changeSnakeDirection(keyCode){
    switch (keyCode){
      case 38: //up
        this.currentDirection = 'up'
        break;
      case 39: //right
        this.currentDirection = 'right'
        break;
      case 40: //down
        this.currentDirection = 'down'
        break;
      case 37: //left
        this.currentDirection = 'left'
        break;
    }
  },
  checkInPlay(head){
    if (head[0] < 0 || head[0] > 39 || head[1] < 0 || head[1] > 39){
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
