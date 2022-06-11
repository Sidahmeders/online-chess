import { PIECES, getPieceTypeFromNumber, PIECES_MOVES } from '../setup.js'
import generatePawnMoves from './generatePawnMoves.js'
import generateKingMoves from './generateKingMoves.js'

export const _state = {
  highlightedBoardSquares: [],
  validMoves: null,
}

export default function validateMoves(selectedNode) {
  const boardContainer = document.getElementById('board-container')
  const { boardArray, virtualBoardArray } = createBoardArrays(boardContainer)
  const pieceType = getPieceTypeFromNumber(selectedNode.id)
  const pieceMoves = PIECES_MOVES()[pieceType]

  const pieceDAO = { boardArray, virtualBoardArray, pieceMoves, selectedNode }
  /* eslint-disable indent */

  switch (pieceType) {
    case 'Pawn':
      generatePawnMoves(pieceDAO)
      break
    case 'King':
      generateKingMoves(pieceDAO)
      break
    default:
      console.warn('unhanlded condition')
      break
  }
}

function createBoardArrays(boardContainer) {
  const boardArray = []
  const virtualBoardArray = []
  boardContainer.childNodes.forEach((rankNode, i) => {
    rankNode.childNodes.forEach((fileNode, j) => {
      let isBoardBound = i < 8 && j > 0
      if (isBoardBound)
        fileNode.childNodes.forEach((node) => {
          boardArray.push(node)
          virtualBoardArray.push(node.id)
        })
    })
  })
  return { boardArray, virtualBoardArray }
}

export function getPieceColor(pieceID) {
  if (pieceID == 0) return 'Empty'
  if (pieceID < 15) return 'White'
  if (pieceID > 16) return 'Black'
}

export function highlightPieceMovements(targetNode) {
  targetNode.style.background = '#49dd'
  _state.highlightedBoardSquares.push(targetNode)
}

export function clearPieceMovementsHighlight() {
  _state.highlightedBoardSquares.forEach((sqaureNode) => (sqaureNode.style.background = 'initial'))
  _state.highlightedBoardSquares = []
}

export function swapNodes(selectedNode, targetNode) {
  const targetPosition = parseInt(targetNode.getAttribute('position'))
  const canSwapNodes = _state.validMoves.includes(targetPosition)
  _state.validMoves = []
  if (!canSwapNodes) return

  targetNode.src = selectedNode.src
  targetNode.id = selectedNode.id
  selectedNode.src = ' '
  selectedNode.id = PIECES.Empty
}

// function generateKingMoves() {}
// function generateQueenMoves() {}
// function generateBishopMoves() {}
// function generateKnightMoves() {}
// function generateRookMoves() {}
