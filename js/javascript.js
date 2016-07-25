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
    // console.log(this.fullSnake);
    $("#"+gameboard.getPosition(head)).addClass('snakeHead');
    if(body){
      for (let partPosition of body){
        $("#"+gameboard.getPosition(partPosition)).addClass('snakeBody');
      }
    }
    setTimeout(function(){
      // snake.moveSnakeBody();
      snakeGrower.growSnake();
      snake.moveSnake(head);
      // console.log(head);
      snake.render();
    }, 500);
  },
  // moveSnakeBody(){
    // let fullSnake = this.fullSnake;
    // let tmpFullSnake = [...fullSnake];
    //   if (tmpFullSnake.length > 1 && this.currentDirection != '') {
    //     let len = tmpFullSnake.length;
    //     for (let i = len - 1; i > 0; i--){
    //       console.log(`fullSnake: ${tmpFullSnake}`)
    //       tmpFullSnake[i] = tmpFullSnake[i - 1];
    //       console.log(`fullSnake: ${tmpFullSnake}`)
    //     }
    //     this.fullSnake = tmpFullSnake;
      // fullSnake.unshift(fullSnake[0]);
      // console.log(`full snake ${this.fullSnake[0]}`)
      // fullSnake.pop();
  //   }
  // },
  addSnakeBodyPiece(){
    let fullSnake = this.fullSnake;
    let newSnakeBodyPartPosition = [...fullSnake[fullSnake.length - 1]];
    if (this.currentDirection === 'up'){
      newSnakeBodyPartPosition[0] +=1;
    }
    else if (this.currentDirection === 'right' || this.currentDirection === ''){
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
  moveSnake(){
      //should check if there is a new direction or same current directionßß
      // this.moveSnakeBody();
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

  },
  moveUp(){
    let snakeHead = [...this.fullSnake[0]];
    snakeHead[0] -= 1;
    this.fullSnake.unshift(snakeHead);
    this.fullSnake.pop();
  },
  moveRight(){
    let snakeHead = [...this.fullSnake[0]];
    snakeHead[1] += 1;
    this.fullSnake.unshift(snakeHead);
    this.fullSnake.pop();
  },
  moveDown(){
    let snakeHead = [...this.fullSnake[0]];
    snakeHead[0] += 1;
    this.fullSnake.unshift(snakeHead);
    this.fullSnake.pop();
  },
  moveLeft(){
    let snakeHead = [...this.fullSnake[0]];
    snakeHead[1] -= 1;
    this.fullSnake.unshift(snakeHead);
    this.fullSnake.pop();
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
  },

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
  removeFood(){
    $("#"+gameboard.getPosition(this.position)).removeClass('food');
  },
  resetFood(){
    this.removeFood();
    this.render();
  },
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

snakeGrower = {
  growSnake(){
    if (testArrayIncluded2dArray(snake.fullSnake, food.position)){
      snake.addSnakeBodyPiece();
      food.resetFood();
    }
  },
}


testArrayIncluded2dArray = function(array, testElement){
  tester = false;
  for (let el of array){
    if(el[0] === testElement[0] && el[1] === testElement[1]){
      tester = true;
    }
  }
  return tester;
}
