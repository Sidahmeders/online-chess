import { FEN_STARTING_POSITION, PIECES } from '../setup.js'

const pieceTypeFromSymbol = {}
pieceTypeFromSymbol['k'] = PIECES.King
pieceTypeFromSymbol['q'] = PIECES.Queen
pieceTypeFromSymbol['b'] = PIECES.Bishop
pieceTypeFromSymbol['n'] = PIECES.Knight
pieceTypeFromSymbol['r'] = PIECES.Rook
pieceTypeFromSymbol['p'] = PIECES.Pawn

export default function loadPositionFromFen() {
  let tmp = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'
}
