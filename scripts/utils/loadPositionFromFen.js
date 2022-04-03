import makePiece from '../makePiece.js'
import { FEN_STARTING_POSITION, PIECES } from '../setup.js'

const pieceTypeFromSymbol = {
  k: PIECES.King,
  q: PIECES.Queen,
  b: PIECES.Bishop,
  n: PIECES.Knight,
  r: PIECES.Rook,
  p: PIECES.Pawn,
}

export default function loadPositionFromFen() {
  window.onload = () => {
    // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
    const fenBoard = FEN_STARTING_POSITION.split(' ')[0]
    const boardContainer = document.getElementById('board-container')

    boardContainer.childNodes.forEach((rankNode, i) => {
      const row = fenBoard.split('/')[i]?.split('') || []
      const fileNodes = rankNode.childNodes

      fileNodes.forEach((node, j) => {
        let boardBound = i < 8 && j > 0
        let boardColor = (i + j) % 2 ? PIECES.Black : PIECES.White
        if (boardBound) node.style.background = boardColor === 8 ? '#0606' : '#ff66'

        let pieceEntry = row[j - 1]?.toLocaleLowerCase()
        let pieceColor = row[j - 1] === pieceEntry ? PIECES.Black : PIECES.White
        const boardPiece = pieceTypeFromSymbol[pieceEntry] + pieceColor

        const IconElement = makePiece(boardPiece)

        if (boardBound) node.appendChild(IconElement)
      })
    })

    console.log(fenBoard, boardContainer)
  }
}
