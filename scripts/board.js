const styles = {
  columnStyle: `
    width: 45px;
    height: 45px;
    border: 1px solid gray;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddd6;
  `,
  rowContainerStyle: `
    display: flex;
  `,
  chessPieceStyle: `
    width: 90%;
    height: 90%;
  `,
}

const boardContainerElement = document.createElement('div')
boardContainerElement.id = 'board-container'

const rows = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const colums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const pieces = [{ K: 'King' }, { Q: 'Queen' }, { R: 'Rook' }, { B: 'Bishop' }, { N: 'Knight' }, { P: 'Pawn' }]

rows.forEach((_, i) => {
  const rowContainerElement = document.createElement('div')
  rowContainerElement.style = styles.rowContainerStyle

  colums.forEach((_, j) => {
    const columnElement = document.createElement('div')
    columnElement.style = styles.columnStyle

    columnElement.appendChild(chessPiece(i, j))

    if (j === 0) columnElement.innerText = colums[7 - i]
    if (8 - i === 0) columnElement.innerText = rows[j]
    if (j === 0 || 8 - i === 0 || j === 0) {
      columnElement.style.borderColor = '#fff'
      columnElement.style.background = '#fff'
    }

    rowContainerElement.appendChild(columnElement)
  })

  boardContainerElement.appendChild(rowContainerElement)
})

function chessPiece(i, j) {
  const iconElement = document.createElement('img')
  iconElement.id = rows[j] + colums[8 - i]
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

document.body.appendChild(boardContainerElement)
