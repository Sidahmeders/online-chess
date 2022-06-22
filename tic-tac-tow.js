var original_board
const human_Player = 'X'
const AI_Player = 'O'
const winComb = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
]

const cells = document.querySelectorAll('.cell')
start_game()

function start_game() {
  document.querySelector('.endGame').style.display = 'none'
  original_board = Array.from(Array(9).keys())
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ''
    cells[i].style.removeProperty('background-color')
    cells[i].addEventListener('click', trun_click, false)
  }
}

function trun_click(square) {
  if (typeof original_board[square.target.id] == 'number') {
    turn(square.target.id, human_Player)
    if (!check_Tie()) turn(best_spot(), AI_Player)
  }
}

function turn(square_id, player) {
  original_board[square_id] = player
  document.getElementById(square_id).innerText = player
  let gameWon = check_winer(original_board, player)
  if (gameWon) game_over(gameWon)
}

function check_winer(board, player) {
  let plays = board.reduce((a, e, i) => (e === player ? a.concat(i) : a), [])
  let gameWon = null
  for (let [index, win] of winComb.entries()) {
    if (win.every((elem) => plays.indexOf(elem) > -1)) {
      gameWon = { index: index, player: player }
      break
    }
  }
  return gameWon
}

function game_over(gameWon) {
  for (let index of winComb[gameWon.index]) {
    document.getElementById(index).style.backgroundColor = gameWon.player == human_Player ? '#346755' : '#9d5954'
  }
  for (let i = 0; i < cells.length; i++) {
    cells[i].removeEventListener('click', trun_click, false)
  }
  declare_winner(gameWon.player == human_Player ? 'you win!' : 'you lose.')
}

function declare_winner(who) {
  document.querySelector('.endGame').style.display = 'block'
  document.querySelector('.endGame .text').innerText = who
}

function empty_squares() {
  return original_board.filter((s) => typeof s == 'number')
}

function best_spot() {
  return min_max(original_board, AI_Player).index
}

function check_Tie() {
  if (empty_squares().length == 0) {
    for (let i = 0; i < cells.length; i++) {
      cells[i].style.backgroundColor = '#F45346'
      cells[i].removeEventListener('click', trun_click, false)
    }
    declare_winner('Tie Game!')
    return true
  }
  return false
}

function min_max(newBoard, player) {
  var availSpots = empty_squares(newBoard)
  if (check_winer(newBoard, player)) {
    return { score: -10 }
  } else if (check_winer(newBoard, AI_Player)) {
    return { score: 20 }
  } else if (availSpots.length === 0) {
    return { score: 0 }
  }
  var moves = []
  for (let i = 0; i < availSpots.length; i++) {
    var move = {}
    move.index = newBoard[availSpots[i]]
    newBoard[availSpots[i]] = player

    if (player === AI_Player) {
      var result = min_max(newBoard, human_Player)
      move.score = result.score
    } else {
      var result = min_max(newBoard, AI_Player)
      move.score = result.score
    }
    newBoard[availSpots[i]] = move.index
    moves.push(move)
  }

  var bestMove
  if (player === AI_Player) {
    var bestScore = -10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }
  } else {
    var bestScore = 10000
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
  }
  return moves[bestMove]
}
