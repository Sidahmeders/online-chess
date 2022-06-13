import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generateKnightMoves({ boardArray, pieceMoves, selectedNode }) {
  _state.validMoves = []
  Object.entries(pieceMoves).forEach(([key, values]) => {
    console.log(key)

    const nodePosition = selectedNode.getAttribute('position')
    const pieceColor = getPieceColor(selectedNode.id)

    let targetNode = selectedNode
    let targetIndex

    for (let val of values) {
      targetIndex = parseInt(targetNode.getAttribute('position'))
      targetIndex += val
      if (targetIndex < 0 || targetIndex > 63) return
      targetNode = boardArray[targetIndex]
    }

    const targetNodePosition = parseInt(targetNode.getAttribute('position'))
    const targetPieceColor = getPieceColor(targetNode.id)

    console.log(targetIndex, targetNodePosition, targetNode)

    if (targetPieceColor === 'Empty' || pieceColor !== targetPieceColor) {
      const validMove = pieceColor === 'White' ? values.reduce((prev, val) => nodePosition + val, 0) : nodePosition
      // val + nodePosition : targetNodePosition

      highlightPieceMovements(targetNode) // boardArray[targetIndex]
      _state.validMoves.push(validMove)
    }
  })
}
