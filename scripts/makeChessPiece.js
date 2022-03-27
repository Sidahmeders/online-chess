const styles = {
  chessPieceStyle: `
    width: 90%;
    height: 90%;
  `,
}

// const pieces = [{ K: 'King' }, { Q: 'Queen' }, { R: 'Rook' }, { B: 'Bishop' }, { N: 'Knight' }, { P: 'Pawn' }]

export default function makeChessPiece(fileID, i, j) {
  const iconElement = document.createElement('img')
  iconElement.id = fileID
  iconElement.onclick = chessPieceClickHanlder
  iconElement.style = styles.chessPieceStyle

  if (i === 1) iconElement.src = './icons/P-B.png'
  if (i === 0 && j === 4) iconElement.src = './icons/Q-B.png'
  if (i === 0 && j === 5) iconElement.src = './icons/K-B.png'
  if ((i === 0 && j === 1) || (i === 0 && j === 8)) iconElement.src = './icons/R-B.png'
  if ((i === 0 && j === 2) || (i === 0 && j === 7)) iconElement.src = './icons/N-B.png'
  if ((i === 0 && j === 3) || (i === 0 && j === 6)) iconElement.src = './icons/B-B.png'

  if (i === 6) iconElement.src = './icons/P-W.png'
  if (i === 7 && j === 4) iconElement.src = './icons/Q-W.png'
  if (i === 7 && j === 5) iconElement.src = './icons/K-W.png'
  if ((i === 7 && j === 1) || (i === 7 && j === 8)) iconElement.src = './icons/R-W.png'
  if ((i === 7 && j === 2) || (i === 7 && j === 7)) iconElement.src = './icons/N-W.png'
  if ((i === 7 && j === 3) || (i === 7 && j === 6)) iconElement.src = './icons/B-W.png'

  return iconElement
}

function chessPieceClickHanlder(event) {
  console.log(event.target.id)
}
