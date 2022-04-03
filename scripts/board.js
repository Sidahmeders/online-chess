// import makePiece from './makePiece.js'

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
}

export default function makeBoard() {
  const boardContainerElement = document.createElement('div')
  boardContainerElement.id = 'board-container'

  const rows = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  const colums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  rows.forEach((_, i) => {
    const rowContainerElement = document.createElement('div')
    rowContainerElement.style = styles.rowContainerStyle

    colums.forEach((_, j) => {
      const columnElement = document.createElement('div')
      columnElement.style = styles.columnStyle

      // const PieceElement = makePiece(rows[j] + colums[7 - i], i, j)
      // columnElement.appendChild(PieceElement)

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

  document.body.appendChild(boardContainerElement)
}
