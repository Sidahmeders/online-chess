import { reactive } from './_reactivity.js'
import { FEN_STARTING_POSITION } from './setup.js'

function parseFenString(FEN_STRING) {
  const fenList = FEN_STRING.split(' ')
  return {
    piecesPlacements: fenList[0],
    playerTurn: fenList[1],
    castlingRights: fenList[2],
    possibleEnPassantTargets: fenList[3],
    halfmoveClock: fenList[4],
    fullmoveNumber: fenList[5],
  }
}

export const fenState = reactive(parseFenString(FEN_STARTING_POSITION))

export const boardState = reactive({
  highlightedBoardSquares: [],
  validMoves: null,
  playerTurn: 8,
  currentFenPosition: FEN_STARTING_POSITION,
})
