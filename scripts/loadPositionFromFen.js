import addDraggableEvents from './pieceMovementsHandlers/addDraggableEvents.js'
import { FEN_STARTING_POSITION, PIECES, PieceTypeFromSymbol } from './setup.js'

export default function loadPositionFromFen() {
  // rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR || rnbqk1nr/pppp1ppp/4p3/2b5/8/4PN2/PPPP1PPP/RNBQKB1R || rnb1k1nr/ppppq1pp/5p2/4p3/1b2P3/2NP1P2/PPP3PP/R1BQKBNR
  const piecesPlacements = FEN_STARTING_POSITION.split(' ')[0]
  const boardNodes = document.getElementById('board-container').childNodes

  let positionCounter = 0
  piecesPlacements.split('/').forEach((fenRow, i) => {
    const boardRanks = transformFenArray(fenRow)
    const fileNodes = boardNodes[i].childNodes

    fileNodes.forEach((node, j) => {
      const isBoardBound = i < 8 && j > 0
      if (isBoardBound) {
        const isBlackTile = (i + j) % 2
        node.style.background = isBlackTile ? '#0606' : '#ff66'
        node.setAttribute('tile-color', isBlackTile ? 'black' : 'white')
        node.setAttribute('row-index', i)
        const pieceEntry = boardRanks[j - 1]?.toLocaleLowerCase()
        const pieceColor = boardRanks[j - 1] === pieceEntry ? PIECES.Black : PIECES.White
        const boardPiece = PieceTypeFromSymbol[pieceEntry] + pieceColor
        const pieceID = boardPiece ? boardPiece : PIECES.Empty
        const IconElement = makePiece(pieceID, positionCounter++)
        node.appendChild(IconElement)
      }
    })
  })
}

function transformFenArray(fenRow) {
  const boardRanks = []
  for (let i = 0; i < fenRow.length; i++) {
    const tmpColumn = fenRow[i]
    const fenChar = parseInt(tmpColumn)
    if (fenChar) for (let j = 0; j < fenChar; j++) boardRanks.push('1')
    else boardRanks.push(tmpColumn)
  }
  return boardRanks
}

const styles = {
  chessPieceStyle: `
    width: 85%;
    height: 85%;
  `,
}

function makePiece(pieceID, position) {
  const IconElement = document.createElement('img')
  IconElement.id = pieceID
  IconElement.setAttribute('position', position)
  IconElement.className = 'chess-piece'
  IconElement.style = styles.chessPieceStyle
  IconElement.src = pieceID ? `icons/${pieceID}.png` : ' '
  IconElement.onclick = pieceClickHanlder
  addDraggableEvents(IconElement)

  return IconElement
}

function pieceClickHanlder(event) {
  console.log(event.target.id, 'id')
  console.log(event.target.getAttribute('position'), 'position')
}
