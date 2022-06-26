import { PIECES } from '../setup.js'
import { getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generatePawnMoves({ boardState, boardArray, pieceMoves, selectedNode }) {
  Object.entries(pieceMoves).forEach(([key, val]) => {
    const nodePosition = parseInt(selectedNode.getAttribute('position'))
    const pieceColor = getPieceColor(selectedNode.id)

    const targetNodePosition = pieceColor === 'White' ? nodePosition + val : nodePosition - val
    if (targetNodePosition < 0 || targetNodePosition > 63) return

    const targetNode = boardArray[targetNodePosition]
    const targetPieceColor = getPieceColor(targetNode.id)

    const canCapture = pieceColor !== targetPieceColor && targetPieceColor !== 'Empty' && key !== 'up'
    const canMoveForward = parseInt(targetNode.id) === PIECES.Empty && key === 'up'

    if (canCapture || canMoveForward) {
      const validMove = pieceColor === 'White' ? nodePosition + val : targetNodePosition
      highlightPieceMovements(boardArray[validMove])
      boardState.validMoves.push(validMove)
    }
  })
}
