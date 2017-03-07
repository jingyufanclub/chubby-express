const BOARD = document.getElementById('board')
const BOARD_HEIGHT = 600
const BOARD_WIDTH = 600
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const UP_ARROW = 38
const DOWN_ARROW = 40
const START = document.getElementById('start')
const FOODS = []

var points = 0
var gameInterval = null

function eatFood() {
  var meal = $('.food').collision('#snake')
  if (!!meal.length){

    $('.food').remove()
    points += 1
    makeChubby()
  }

  if (positionToInteger($('#snake').css('height')) >= BOARD_HEIGHT) {
    endGame()
  }
}

function moveSnake(e) {
  if (e.which === LEFT_ARROW) {
    moveSnakeLeft()
  } else if (e.which === RIGHT_ARROW) {
    moveSnakeRight()
  } else if (e.which === UP_ARROW) {
    moveSnakeUp()
  } else if (e.which === DOWN_ARROW) {
    moveSnakeDown()
  }
}

function moveSnakeLeft() {
  window.requestAnimationFrame(function(){
    var left = positionToInteger($('#snake').css("left"))
    if (left > 0){
      $('#snake').css('left', left - 20)
    }
  })
}

function moveSnakeRight() {
  window.requestAnimationFrame(function(){
    var left = positionToInteger($('#snake').css("left"))
    if (left < (595 -(positionToInteger($('#snake').css('width'))))){
      $('#snake').css('left', left + 20)
    }
  })
}

function moveSnakeUp() {
  window.requestAnimationFrame(function(){
    var bottom = positionToInteger($('#snake').css('bottom'))
    if (bottom < 600) {
      $('#snake').css('bottom', bottom + 20)
    }
  })
}

function moveSnakeDown() {
  window.requestAnimationFrame(function(){
    var bottom = positionToInteger($('#snake').css('bottom'))
    if (bottom > 0) {
      $('#snake').css('bottom', bottom -   20)
    }
  })
}

function positionToInteger(spot) {
  return parseInt(spot.split('px')[0]) || 0
}

function createFood(x){
  var food = document.createElement('div')
  food.className = 'food'
  food.style.left = `${x}px`
  var top = food.style.top = 0
  $('#board').append(food)

  function moveFood(){
    food.style.top = `${top += 5}px`
    if (top < BOARD_HEIGHT) {
      window.requestAnimationFrame(moveFood)
    } else {
      food.remove()
    }
  }

  window.requestAnimationFrame(moveFood)
  FOODS.push(food)
  return food
}

function makeChubby() {
  var el = document.getElementById("snake");
  var width = el.offsetWidth
  if ((positionToInteger($('#snake').css('width')) + 30) >= BOARD_WIDTH) {
    var newWidth = BOARD_WIDTH
    el.style.width = newWidth + 'px';
  } else if ( positionToInteger($('#snake').css('width')) < BOARD_WIDTH ) {
    var newWidth= width + 30;
    el.style.width = newWidth + 'px';
  }

  var height = el.offsetHeight;
  if (positionToInteger($('#snake').css('width')) >= BOARD_WIDTH){
    var newHeight = height + 50
    el.style.height = newHeight + 'px'
  } else {
    var newHeight = height + 15;
    el.style.height = newHeight + 'px'
  }
}

function endGame() {
  clearInterval(gameInterval)
  $('#snake').css({width: 40, height: 40, left: 300})
  $('#start').html("Time for another meal?")
  $('#start').css('display', 'inline')
}

function start(){
  $('#start').css('display', 'none')
  window.addEventListener('keydown', moveSnake)
  gameInterval = setInterval(function(){
    createFood(Math.floor(Math.random() * (BOARD_WIDTH - 20)))
  }, 2000)
  setInterval(function(){
    eatFood()
  }, 100)
}
