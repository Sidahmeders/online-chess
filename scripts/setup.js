/*
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
   |                                           | |    | | |
   1                                           2 3    4 5 6

  1. Pieces placements.
  2. who moves next, "w" -> White's turn, "b" Black's turn.
  3. Castling Rights.
  4. Possible En Passant Targets.
  5. Halfmove Clock (50-move draw), when counter reaches 100 the game ends in a draw.
  6. Fullmove Number (number of completed turns).
*/
export const FEN_STARTING_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const PIECES = {
  /*  
    bin=10010, dec=16+2 -> COLOR:10 TYPE:010 => Black Queen
    bin=01001, dec=8+1  -> COLOR:01 TYPE:001 => White King
    -- -- -- -- --
    22 => Black Pawn
    21 => Black Rook
    20 => Black Knight
    19 => Black Bishop
    18 => Black QUEEN
    17 => Black KING
    14 => White Pawn
    13 => White Rook
    12 => White Knight
    11 => White Bishop
    10 => White Queen
    9  => White King
  */
  Empty: 0,
  King: 1,
  Queen: 2,
  Bishop: 3,
  Knight: 4,
  Rook: 5,
  Pawn: 6,
  White: 8,
  Black: 16,
}

export function PIECES_MOVES() {
  /*
  -9  -1   -7
    \  |  /
  -1 <-n-> +1
    /  |  \
  +7  +1   +9
  */
  const straightMoves = { left: -1, right: +1, up: -8, down: +8 }
  const diagonalMoves = { upLeft: -9, upRight: -7, downLeft: +7, downRight: +9 }
  const allDirections = { ...straightMoves, ...diagonalMoves }
  const KnightMoves = {
    upLeft: [-8, -8, -1],
    upRight: [-8, -8, +1],
    downLeft: [+8, +8, -1],
    downRight: [+8, +8, +1],
    leftUp: [-1, -1, -8],
    rightUp: [+1, +1, -8],
    leftDown: [-1, -1, +8],
    rightDown: [+1, +1, +8],
  }

  const King = { moves: allDirections, capture: allDirections }
  const Queen = { moves: allDirections, capture: allDirections }
  const Bishop = { moves: diagonalMoves, capture: diagonalMoves }
  const Knight = { moves: KnightMoves, capture: KnightMoves }
  const Rook = { moves: straightMoves, capture: straightMoves }
  const Pawn = { moves: { up: -8 }, capture: { upLeft: -9, upRight: -7 } }

  return Object.freeze({
    King: () => King,
    Queen: () => Queen,
    Bishop: () => Bishop,
    Knight: () => Knight,
    Rook: () => Rook,
    Pawn: () => Pawn,
  })
}
