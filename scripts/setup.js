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

export const PieceTypeFromSymbol = {
  k: PIECES.King,
  q: PIECES.Queen,
  b: PIECES.Bishop,
  n: PIECES.Knight,
  r: PIECES.Rook,
  p: PIECES.Pawn,
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
  const King = { ...straightMoves, ...diagonalMoves }
  const Queen = { straightMoves, diagonalMoves }
  const Bishop = diagonalMoves
  const Knight = {
    upLeft: [-8, -8, -1],
    upRight: [-8, -8, +1],
    downLeft: [+8, +8, -1],
    downRight: [+8, +8, +1],
    leftUp: [-1, -1, -8],
    rightUp: [+1, +1, -8],
    leftDown: [-1, -1, +8],
    rightDown: [+1, +1, +8],
  }
  const Rook = straightMoves
  const Pawn = { up: -8, upLeft: -9, upRight: -7 }

  return Object.freeze({ King, Queen, Bishop, Knight, Rook, Pawn })
}

export const decToBin = (decimal) => {
  if (decimal === 0) return decimal
  let reminder = decimal % 2
  let bin = decToBin(Math.floor(decimal / 2)) + reminder
  return String(bin)
}

export function getPieceTypeFromNumber(number) {
  let bin = decToBin(number)
  bin = bin.length === 4 ? '0' + bin : bin

  const typeValue = parseInt('00' + bin.slice(2), 2)
  const pieceType = Object.entries(PIECES)
    .map(([key, value]) => (value == typeValue ? key : null))
    .filter((val) => val)[0]

  return pieceType
}

export function buildFenString(virtualBoard) {
  let fenPlaceholder = ''
  let emptySquaresCount = 0

  virtualBoard.forEach((val, i) => {
    const isNewRow = i !== 0 && i % 8 === 0
    const pieceFenChar = getPieceTypeFromNumber(val)
    const isEmptyColumn = pieceFenChar === 'Empty'

    if ((isNewRow || !isEmptyColumn) && emptySquaresCount) {
      fenPlaceholder += emptySquaresCount
      emptySquaresCount = 0
    }
    if (isNewRow) fenPlaceholder += '/'

    if (!isEmptyColumn) {
      const pieceSymbol = pieceFenChar === 'Knight' ? 'N' : pieceFenChar.slice(0, 1)
      fenPlaceholder += val <= 15 ? pieceSymbol : pieceSymbol.toLowerCase()
    } else emptySquaresCount++
  })

  return fenPlaceholder
}
