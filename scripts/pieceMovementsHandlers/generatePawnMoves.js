import { PIECES } from '../setup.js'
import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generatePawnMoves({ boardArray, virtualBoardArray, piecePosition, pieceMoves, selectedNode }) {
  console.log(boardArray, virtualBoardArray)

  _state.validMoves = []
  const visitedDirections = new Set()
  Object.entries(pieceMoves).forEach(([key, val]) => {
    let positionCounter = parseInt(piecePosition)
    while (!visitedDirections.has(key)) {
      const boardColumnElement = boardArray[positionCounter]
      const pieceColor = getPieceColor(selectedNode.id)
      const targetPieceColor = getPieceColor(boardColumnElement.id)

      if (pieceColor === 'White') positionCounter += val
      if (pieceColor === 'Black') positionCounter -= val
      // if we get out of bound, return
      if (positionCounter < 0 || positionCounter > 63) return

      const nodePosition = selectedNode.getAttribute('position')
      const targetNodePosition = boardColumnElement.getAttribute('position')
      const canCapture = pieceColor !== targetPieceColor && targetPieceColor !== 'Empty' && key !== 'up'

      const isFriendlPiece = nodePosition !== targetNodePosition && targetPieceColor !== 'Empty'
      // if we found a friendlly piece, stop explorig and return
      if (isFriendlPiece && !canCapture) return

      const [nodeRow, targetRow] = [Math.floor(nodePosition / 8), Math.floor(targetNodePosition / 8)]
      const canMoveForward = parseInt(boardColumnElement.id) === PIECES.Empty && key === 'up'
      const canLeapTo = Math.abs(nodeRow - targetRow) === 1

      // if we found an opposing piece, capture it and return
      if ((canCapture || canMoveForward) && canLeapTo) {
        highlightPieceMovements(boardColumnElement)
        _state.playingTurn = pieceColor
        _state.validMoves.push(val)
        visitedDirections.add(key)
      }
    }
  })
}
