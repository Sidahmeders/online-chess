import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generateKingMoves({ boardArray, pieceMoves, selectedNode }) {
  // console.log(boardArray, virtualBoardArray)
  _state.validMoves = []
  const visitedDirections = new Set()
  Object.entries(pieceMoves).forEach(([key, val]) => {
    let positionCounter = parseInt(selectedNode.getAttribute('position'))
    while (!visitedDirections.has(key)) {
      const targetNode = boardArray[positionCounter]
      const pieceColor = getPieceColor(selectedNode.id)
      // const targetPieceColor = getPieceColor(targetNode.id)

      const nodePosition = selectedNode.getAttribute('position')
      const targetNodePosition = targetNode.getAttribute('position')

      if (pieceColor) {
        console.log(targetNode)
        highlightPieceMovements(targetNode)
        visitedDirections.add(key)
        const validMove = pieceColor === 'White' ? val + parseInt(nodePosition) : parseInt(targetNodePosition)
        _state.validMoves.push(validMove)
      }

      if (pieceColor === 'White') positionCounter += val
      if (pieceColor === 'Black') positionCounter -= val
      // if we get out of bound, return
      if (positionCounter < 0 || positionCounter > 63) return
    }
  })
}
