import { reactive } from './_reactivity.js'
import { FEN_STARTING_POSITION } from './setup.js'

const _state = reactive({
  highlightedBoardSquares: [],
  validMoves: null,
  playerTurn: 8,
  currentFenPosition: FEN_STARTING_POSITION,
})

export default _state
