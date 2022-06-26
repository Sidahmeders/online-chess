import { getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generateBishopMoves({ boardState, boardArray, pieceMoves, selectedNode }) {
  Object.values(pieceMoves).forEach((val) => {
    let counter = 0
    while (counter++ < 8) {
      let increment = val * counter

      let nodePosition = parseInt(selectedNode.getAttribute('position'))
      const pieceColor = getPieceColor(selectedNode.id)

      const targetNodePosition = pieceColor === 'White' ? nodePosition + increment : nodePosition - increment
      if (targetNodePosition < 0 || targetNodePosition > 63) return

      const targetNode = boardArray[targetNodePosition]
      const targetPieceColor = getPieceColor(targetNode.id)

      if (pieceColor === targetPieceColor) return
      // EGE CASE: stop when you jupm to a diffrent tile color
      const tileColor = selectedNode.parentNode.getAttribute('tile-color')
      const targetTileColor = targetNode.parentNode.getAttribute('tile-color')
      if (tileColor !== targetTileColor) return

      if (targetPieceColor === 'Empty' || pieceColor !== targetPieceColor) {
        const validMove = pieceColor === 'White' ? increment + nodePosition : targetNodePosition
        highlightPieceMovements(boardArray[validMove])
        boardState.validMoves.push(validMove)
      }

      if (pieceColor !== targetPieceColor && targetPieceColor !== 'Empty') return
    }
  })
}
