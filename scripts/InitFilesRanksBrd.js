import { BRD_SQ_NUM, SQUARES, RANKS, FILES } from './InMemoryGame.js'

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
