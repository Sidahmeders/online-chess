import { PIECES } from '../setup.js'
import { _state, getPieceColor, highlightPieceMovements } from './validateMoves.js'

export default function generatePawnMoves({ boardArray, pieceMoves, selectedNode }) {
  // console.log(boardArray, virtualBoardArray)
  _state.validMoves = []

  Object.entries(pieceMoves).forEach(([key, val]) => {
    let positionCounter = parseInt(selectedNode.getAttribute('position'))
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const targetNode = boardArray[positionCounter]

      const pieceColor = getPieceColor(selectedNode.id)
      const targetPieceColor = getPieceColor(targetNode.id)

      const nodePosition = selectedNode.getAttribute('position')
      const targetNodePosition = targetNode.getAttribute('position')

      const canCapture = pieceColor !== targetPieceColor && targetPieceColor !== 'Empty' && key !== 'up'
      const isFriendlPiece = nodePosition !== targetNodePosition && targetPieceColor !== 'Empty'

      // if we found a friendlly piece, stop explorig and return
      if (isFriendlPiece && !canCapture) return

      const [nodeRow, targetRow] = [Math.floor(nodePosition / 8), Math.floor(targetNodePosition / 8)]
      const canMoveForward = parseInt(targetNode.id) === PIECES.Empty && key === 'up'
      const canLeapTo = Math.abs(nodeRow - targetRow) === 1

      // if we found an opposing piece, capture it and return
      if ((canCapture || canMoveForward) && canLeapTo) {
        const validMove = pieceColor === 'White' ? val + parseInt(nodePosition) : parseInt(targetNodePosition)
        highlightPieceMovements(boardArray[validMove])
        _state.validMoves.push(validMove)
      }

      if (pieceColor === 'White') positionCounter += val
      if (pieceColor === 'Black') positionCounter -= val
      // if we get out of bound, return
      if (positionCounter < 0 || positionCounter > 63) return
    }
  })
}
