const BRD_SQ_NUM = 120

const FILES = { FILE_A: 0, FILE_B: 1, FILE_C: 2, FILE_D: 3, FILE_E: 4, FILE_F: 5, FILE_G: 6, FILE_H: 7, FILE_NONE: 8 }

const RANKS = { RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3, RANK_5: 4, RANK_6: 5, RANK_7: 6, RANK_8: 7, RANK_NONE: 8 }

const COLOURS = { WHITE: 0, BLACK: 1, BOTH: 2 }

const SQUARES = {
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

const BOOL = { FALSE: 0, TRUE: 1 }

const FilesBrd = new Array(BRD_SQ_NUM)
const RanksBrd = new Array(BRD_SQ_NUM)

function FR2SQ(f, r) {
  return 21 + f + r * 10
}

export default function InitFilesRanksBrd() {
  for (let i = 0; i < BRD_SQ_NUM; i++) {
    FilesBrd[i] = SQUARES.OFFBOARD
    RanksBrd[i] = SQUARES.OFFBOARD
  }

  for (let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
    for (let file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
      let sq = FR2SQ(file, rank)
      FilesBrd[sq] = file
      RanksBrd[sq] = rank

      console.groupCollapsed(rank, file)
      console.log('FilesBrd[0]:' + FilesBrd[0] + ' RanksBrd[0]:' + RanksBrd[0])
      console.log('FilesBrd[SQUARES.A1]:' + FilesBrd[SQUARES.A1] + ' RanksBrd[SQUARES.A1]:' + RanksBrd[SQUARES.A1])
      console.log('FilesBrd[SQUARES.E8]:' + FilesBrd[SQUARES.E8] + ' RanksBrd[SQUARES.E8]:' + RanksBrd[SQUARES.E8])
      console.groupEnd()
    }
  }
}