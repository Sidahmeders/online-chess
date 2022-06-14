import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

const boardBorders = [
  56, 57, 58, 59, 60, 61, 62, 63 /* bottom*/, 0, 1, 2, 3, 4, 5, 6, 7 /*top*/, 0, 8, 16, 24, 32, 40, 48, 56 /*left*/, 7,
  15, 23, 31, 39, 47, 55 /*right*/,
]

export default function generateKnightMoves({ boardArray, pieceMoves, selectedNode }) {
  _state.validMoves = []
  Object.values(pieceMoves).forEach((values) => {
    const pieceColor = getPieceColor(selectedNode.id)

    let targetNode = selectedNode
    let targetNodePosition

    let boardLimiter = 0

    for (let val of values) {
      targetNodePosition = parseInt(targetNode.getAttribute('position'))

      if (boardBorders.includes(targetNodePosition)) boardLimiter++
      if (boardLimiter === 2) return

      targetNodePosition += val
      if (targetNodePosition < 0 || targetNodePosition > 63) return
      targetNode = boardArray[targetNodePosition]
    }

    const targetPieceColor = getPieceColor(targetNode.id)

    if (targetPieceColor === 'Empty' || pieceColor !== targetPieceColor) {
      highlightPieceMovements(targetNode)
      _state.validMoves.push(targetNodePosition)
    }
  })
}
