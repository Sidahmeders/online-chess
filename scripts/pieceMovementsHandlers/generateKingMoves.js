import { getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generateKingMoves({ boardState, boardArray, pieceMoves, selectedNode }) {
  Object.values(pieceMoves).forEach((val) => {
    let nodePosition = parseInt(selectedNode.getAttribute('position'))
    const pieceColor = getPieceColor(selectedNode.id)

    const targetNodePosition = pieceColor === 'White' ? nodePosition + val : nodePosition - val
    if (targetNodePosition < 0 || targetNodePosition > 63) return

    const targetNode = boardArray[targetNodePosition]
    const targetPieceColor = getPieceColor(targetNode.id)

    if (targetPieceColor === 'Empty' || pieceColor !== targetPieceColor) {
      const validMove = pieceColor === 'White' ? val + nodePosition : targetNodePosition
      highlightPieceMovements(boardArray[validMove])
      boardState.validMoves.push(validMove)
    }
  })
}
