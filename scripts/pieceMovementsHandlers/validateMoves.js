import { PIECES, getPieceTypeFromNumber, PIECES_MOVES } from '../setup.js'
import generatePawnMoves from './generatePawnMoves.js'

export const _state = {
  highlightedBoardSquares: [],
  validMoves: null,
  playingTurn: null,
}

export default function validateMoves(selectedNode) {
  const boardContainer = document.getElementById('board-container')
  const { boardArray, virtualBoardArray } = createVirtualBoard(boardContainer)
  const piecePosition = selectedNode.getAttribute('position')
  const pieceType = getPieceTypeFromNumber(selectedNode.id)
  const pieceMoves = PIECES_MOVES()[pieceType]

  const pieceDAO = { boardArray, virtualBoardArray, piecePosition, pieceMoves, selectedNode }
  /* eslint-disable indent */
  switch (pieceType) {
    case 'Pawn':
      generatePawnMoves(pieceDAO)
      break
    default:
      console.warn('unhanlded condition')
      break
  }
}

function createVirtualBoard(boardContainer) {
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

export function highlightPieceMovements(boardColumnElement) {
  boardColumnElement.style.background = '#49dd'
  _state.highlightedBoardSquares.push(boardColumnElement)
}

export function clearPieceMovementsHighlight() {
  _state.highlightedBoardSquares.forEach((sqaureNode) => (sqaureNode.style.background = 'initial'))
  _state.highlightedBoardSquares = []
}

export function swapNodes(selectedNode, targetNode) {
  const [selected, target] = [selectedNode.getAttribute('position'), targetNode.getAttribute('position')]
  const isValidMove =
    _state.playingTurn === 'White'
      ? _state.validMoves.some((val) => val + parseInt(selected) == parseInt(target))
      : _state.validMoves.some((val) => val + parseInt(target) == parseInt(selected))

  _state.validMoves = []
  if (!isValidMove) return

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
