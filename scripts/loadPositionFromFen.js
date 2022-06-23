import makePiece from './makePiece.js'
import { FEN_STARTING_POSITION, PIECES, PieceTypeFromSymbol } from './setup.js'

export default function loadPositionFromFen() {
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR
  const fenBoard =
    'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR' ||
    'rkbqk1kr/pppp1ppp/4p3/2b5/8/4PN2/PPPP1PPP/RKBQKB1R' ||
    FEN_STARTING_POSITION.split(' ')[0]
  const boardContainer = document.getElementById('board-container')

  let positionCounter = 0
  boardContainer.childNodes.forEach((rankNode, i) => {
    const row = fenBoard.split('/')[i]?.split('') || []
    const fileNodes = rankNode.childNodes

    // console.log(row)

    for (let j = 0; j < fileNodes.length; j++) {
      const node = fileNodes[j]

      const isBoardBound = i < 8 && j > 0
      if (isBoardBound) {
        const isBlackTile = (i + j) % 2
        node.style.background = isBlackTile ? '#0606' : '#ff66'
        node.setAttribute('tile-color', isBlackTile ? 'black' : 'white')
        node.setAttribute('row-index', i)

        const pieceEntry = row[j - 1]?.toLocaleLowerCase()
        const pieceColor = row[j - 1] === pieceEntry ? PIECES.Black : PIECES.White
        const boardPiece = PieceTypeFromSymbol[pieceEntry] + pieceColor

        const pieceID = boardPiece ? boardPiece : PIECES.Empty
        const IconElement = makePiece(pieceID, positionCounter++)
        node.appendChild(IconElement)
      }
    }
  })
}
