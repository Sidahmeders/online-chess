import { PIECES } from '../setup.js'
import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generatePawnMoves({ boardArray, pieceMoves, selectedNode }) {
  // console.log(boardArray, virtualBoardArray)
  _state.validMoves = []
  Object.entries(pieceMoves).forEach(([key, val]) => {
    const nodePosition = parseInt(selectedNode.getAttribute('position'))
    const pieceColor = getPieceColor(selectedNode.id)

    const targetIndex = pieceColor === 'White' ? nodePosition + val : nodePosition - val
    if (targetIndex < 0 || targetIndex > 63) return

    const targetNode = boardArray[targetIndex]
    const targetNodePosition = parseInt(targetNode.getAttribute('position'))
    const targetPieceColor = getPieceColor(targetNode.id)

    const canCapture = pieceColor !== targetPieceColor && targetPieceColor !== 'Empty' && key !== 'up'
    const canMoveForward = parseInt(targetNode.id) === PIECES.Empty && key === 'up'

    if (canCapture || canMoveForward) {
      const validMove = pieceColor === 'White' ? nodePosition + val : targetNodePosition
      highlightPieceMovements(boardArray[validMove])
      _state.validMoves.push(validMove)
    }
  })
}
