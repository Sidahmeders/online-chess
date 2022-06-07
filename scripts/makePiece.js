import addDraggableEvents from './pieceMovementsHandlers/addDraggableEvents.js'

const styles = {
  chessPieceStyle: `
    width: 85%;
    height: 85%;
  `,
}

export default function makePiece(pieceID, position) {
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
