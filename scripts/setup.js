export const FEN_STARTING_POSITION = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'

export const PIECES = {
  // bin[10010], dec[16+2] -> COLOR:10 TYPE:010 => Black Queen
  // bin[01001], dec[8+1]  -> COLOR:01 TYPE:001 => White King
  /*  
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
