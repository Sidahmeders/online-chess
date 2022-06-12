import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generateKingMoves({ boardArray, pieceMoves, selectedNode }) {
  // console.log(boardArray, virtualBoardArray)
  _state.validMoves = []
  Object.values(pieceMoves).forEach((val) => {
    let nodePosition = parseInt(selectedNode.getAttribute('position'))
    const pieceColor = getPieceColor(selectedNode.id)

    const targetIndex = pieceColor === 'White' ? nodePosition + val : nodePosition - val
    if (targetIndex < 0 || targetIndex > 63) return

    const targetNode = boardArray[targetIndex]
    const targetNodePosition = parseInt(targetNode.getAttribute('position'))
    const targetPieceColor = getPieceColor(targetNode.id)

    if (targetPieceColor === 'Empty' || pieceColor !== targetPieceColor) {
      const validMove = pieceColor === 'White' ? val + nodePosition : targetNodePosition
      highlightPieceMovements(boardArray[validMove])
      _state.validMoves.push(validMove)
    }
  })
}
