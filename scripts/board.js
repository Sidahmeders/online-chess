const styles = {
  columnElement: `
    width: 45px;
    height: 45px;
    border: 1px solid gray;
    display: flex;
    align-items: flex-end;
  `,
  rowContainerElement: `
    display: flex;
  `
}

const boardContainerElement = document.createElement('div')
boardContainerElement.id = 'board-container'

const rows = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
const colums = [1, 2, 3, 4, 5, 6, 7, 8]

rows.forEach((_, i) => {
  const rowContainerElement = document.createElement('div')
  rowContainerElement.style = styles.rowContainerElement
  
  colums.forEach((_, j) => {
    const columnElement = document.createElement('div')
    columnElement.style = styles.columnElement

    if (j === 0) columnElement.innerText = colums[7 - i]
    if (7 - i === 0) columnElement.innerText = rows[j]
    if (j === 0 && 7 - i === 0) columnElement.innerText = colums[7 - i] + " / " + rows[j]

    rowContainerElement.appendChild(columnElement)
  })
  boardContainerElement.appendChild(rowContainerElement)
})

document.body.appendChild(boardContainerElement)
