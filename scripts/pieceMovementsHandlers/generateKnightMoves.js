import { getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generateKnightMoves({ boardState, boardArray, pieceMoves, selectedNode }) {
  Object.values(pieceMoves).forEach((values) => {
    const pieceColor = getPieceColor(selectedNode.id)

    let targetNode = selectedNode
    let targetNodePosition
    for (let val of values) {
      targetNodePosition = parseInt(targetNode.getAttribute('position'))
      targetNodePosition += val
      if (targetNodePosition < 0 || targetNodePosition > 63) return
      targetNode = boardArray[targetNodePosition]
    }

    const targetPieceColor = getPieceColor(targetNode.id)
    const canLeapTo = targetPieceColor === 'Empty' || pieceColor !== targetPieceColor
    // EGE CASE: stop when you jupm to a diffrent tile color
    const tileColor = selectedNode.parentNode.getAttribute('tile-color')
    const targetTileColor = targetNode.parentNode.getAttribute('tile-color')

    if (canLeapTo && tileColor !== targetTileColor) {
      highlightPieceMovements(targetNode)
      boardState.validMoves.push(targetNodePosition)
    }
  })
}
