import { PIECES } from '../setup.js'

export default function validateMoves(selectedNode, targetNode) {
  const boardArray = []
  const boardContainer = document.getElementById('board-container')
  boardContainer.childNodes.forEach((rankNode, i) => {
    rankNode.childNodes.forEach((fileNode, j) => {
      let isBoardBound = i < 8 && j > 0
      if (isBoardBound) fileNode.childNodes.forEach((node) => boardArray.push(node.id))
    })
  })

  const selectedPosition = selectedNode.getAttribute('position')
  const targetPosition = targetNode.getAttribute('position')

  console.log(selectedPosition, targetPosition)
  console.log(boardArray[selectedPosition], boardArray[targetPosition])

  targetNode.src = selectedNode.src
  targetNode.id = selectedNode.id
  selectedNode.src = ' '
  selectedNode.id = PIECES.Empty
}

function exploreBoard() {}
