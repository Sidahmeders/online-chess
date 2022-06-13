import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generateBishopMoves({ boardArray, pieceMoves, selectedNode }) {
  _state.validMoves = []
  Object.values(pieceMoves).forEach((val) => {
    let counter = 0
    while (counter++ < 8) {
      let increment = val * counter

      let nodePosition = parseInt(selectedNode.getAttribute('position'))
      const pieceColor = getPieceColor(selectedNode.id)

      const targetIndex = pieceColor === 'White' ? nodePosition + increment : nodePosition - increment
      if (targetIndex < 0 || targetIndex > 63) return

      const targetNode = boardArray[targetIndex]
      const targetNodePosition = parseInt(targetNode.getAttribute('position'))
      const targetPieceColor = getPieceColor(targetNode.id)

      if (pieceColor === targetPieceColor) return
      // WIERD EGE CASE: don't why we are jupming to a diffrent tile color
      const tileColor = selectedNode.parentNode.getAttribute('tile-color')
      const targetTileColor = targetNode.parentNode.getAttribute('tile-color')
      if (tileColor !== targetTileColor) return

      if (targetPieceColor === 'Empty' || pieceColor !== targetPieceColor) {
        const validMove = pieceColor === 'White' ? increment + nodePosition : targetNodePosition
        highlightPieceMovements(boardArray[validMove])
        _state.validMoves.push(validMove)
      }

      if (pieceColor !== targetPieceColor && targetPieceColor !== 'Empty') return
    }
  })
}
