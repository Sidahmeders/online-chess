export const BRD_SQ_NUM = 120

export const FILES = {
  FILE_A: 0,
  FILE_B: 1,
  FILE_C: 2,
  FILE_D: 3,
  FILE_E: 4,
  FILE_F: 5,
  FILE_G: 6,
  FILE_H: 7,
  FILE_NONE: 8,
}

export const RANKS = {
  RANK_1: 0,
  RANK_2: 1,
  RANK_3: 2,
  RANK_4: 3,
  RANK_5: 4,
  RANK_6: 5,
  RANK_7: 6,
  RANK_8: 7,
  RANK_NONE: 8,
}

export const COLORS = { WHITE: 0, BLACK: 1, BOTH: 2 }

export const PIECES = {
  EMPTY: 0,
  wP: 1,
  wN: 2,
  wB: 3,
  wR: 4,
  wQ: 5,
  wK: 6,
  bP: 7,
  bN: 8,
  bB: 9,
  bR: 10,
  bQ: 11,
  bK: 12,
}

export const CASTLEBIT = { WKCA: 1, WQCA: 2, BKCA: 4, BQCA: 8 }

export const SQUARES = {
  A1: 21,
  B1: 22,
  C1: 23,
  D1: 24,
  E1: 25,
  F1: 26,
  G1: 27,
  H1: 28,
  A8: 91,
  B8: 92,
  C8: 93,
  D8: 94,
  E8: 95,
  F8: 96,
  G8: 97,
  H8: 98,
  NO_SQ: 99,
  OFFBOARD: 100,
}

export const MajorPiece = [false, false, false, false, true, true, true, false, false, false, true, true, true]
export const NormalPiece = [false, false, true, true, true, true, true, false, true, true, true, true, true]
export const MinorPiece = [false, false, true, true, false, false, false, false, true, true, false, false, false]
export const PieceValue = [0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000]

export const PieceCol = [
  COLORS.BOTH,
  COLORS.WHITE,
  COLORS.WHITE,
  COLORS.WHITE,
  COLORS.WHITE,
  COLORS.WHITE,
  COLORS.WHITE,
  COLORS.BLACK,
  COLORS.BLACK,
  COLORS.BLACK,
  COLORS.BLACK,
  COLORS.BLACK,
  COLORS.BLACK,
]

export const PiecePawn = [false, true, false, false, false, false, false, true, false, false, false, false, false]
export const PieceKnight = [false, false, true, false, false, false, false, false, true, false, false, false, false]
export const PieceKing = [false, false, false, false, false, false, true, false, false, false, false, false, true]
export const PieceRookQueen = [false, false, false, false, true, true, false, false, false, false, true, true, false]
export const PieceBishopQueen = [false, false, false, true, false, true, false, false, false, true, false, true, false]
export const PieceSlides = [false, false, false, true, true, true, false, false, false, true, true, true, false]
