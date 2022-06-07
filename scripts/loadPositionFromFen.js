import makePiece from './makePiece.js'
import { FEN_STARTING_POSITION, PIECES, PieceTypeFromSymbol } from './setup.js'

export default function loadPositionFromFen() {
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  const fenBoard = FEN_STARTING_POSITION.split(' ')[0]
  const boardContainer = document.getElementById('board-container')

  let positionCounter = 0
  boardContainer.childNodes.forEach((rankNode, i) => {
    const row = fenBoard.split('/')[i]?.split('') || []
    const fileNodes = rankNode.childNodes

    fileNodes.forEach((node, j) => {
      const isBoardBound = i < 8 && j > 0
      if (isBoardBound) {
        node.style.background = (i + j) % 2 ? '#0606' : '#ff66'
        const pieceEntry = row[j - 1]?.toLocaleLowerCase()
        const pieceColor = row[j - 1] === pieceEntry ? PIECES.Black : PIECES.White
        const boardPiece = PieceTypeFromSymbol[pieceEntry] + pieceColor
        const pieceID = boardPiece ? boardPiece : PIECES.Empty
        const IconElement = makePiece(pieceID, positionCounter++)
        node.appendChild(IconElement)
      }
    })
  })
}
