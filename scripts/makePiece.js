import addDraggableEvents from './utils/addDraggableEvents.js'

const styles = {
  chessPieceStyle: `
    width: 85%;
    height: 85%;
  `,
}

export default function makePiece(boardPiece) {
  const IconElement = document.createElement('img')
  IconElement.id = boardPiece
  IconElement.style = styles.chessPieceStyle
  IconElement.src = boardPiece ? `icons/${boardPiece}.png` : ' '
  IconElement.onclick = pieceClickHanlder
  addDraggableEvents(IconElement)

  return IconElement
}

function pieceClickHanlder(event) {
  console.log(event.target.id)
}
