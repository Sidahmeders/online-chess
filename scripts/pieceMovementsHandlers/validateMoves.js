import { PIECES, getPieceTypeFromNumber, PIECES_MOVES } from '../setup.js'

let highlightedBoardSquares = []
let validMoves
let playingTurn

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

function generatePawnMoves({ boardArray, virtualBoardArray, piecePosition, pieceMoves, selectedNode }) {
  console.log(pieceMoves, boardArray, virtualBoardArray)

  validMoves = []
  const visitedDirections = new Set()
  Object.entries(pieceMoves).forEach(([key, val]) => {
    let positionCounter = parseInt(piecePosition)
    // if we got out of bound, break
    while (!visitedDirections.has(key)) {
      const boardColumnElement = boardArray[positionCounter]

      // if we found a friendlly piece, stop explorig and break
      const isFriendlPiece =
        selectedNode.getAttribute('position') !== boardColumnElement.getAttribute('position') &&
        boardColumnElement.getAttribute('src') !== ' '
      if (isFriendlPiece) break

      // if we found an opposing piece, capture it and break
      // TODO:

      const isEmptyPiece = parseInt(boardColumnElement.id) === PIECES.Empty
      const pieceColor = isSameColor(selectedNode.id, boardColumnElement.id)

      if (pieceColor === 'White') positionCounter += val
      if (pieceColor === 'Black') positionCounter -= val
      if (positionCounter < 0 || positionCounter > 63 || isEmptyPiece) {
        playingTurn = pieceColor
        validMoves.push(val)
        visitedDirections.add(key)
      }
      if (isEmptyPiece) highlightPieceMovements(boardColumnElement)
    }
  })
}

function isSameColor(pieceID, targetPieceID) {
  if (pieceID < 15 && targetPieceID < 15) return 'White'
  if (pieceID > 16 && targetPieceID > 16) return 'Black'
  return false
}

function highlightPieceMovements(boardColumnElement) {
  boardColumnElement.style.background = '#49dd'
  highlightedBoardSquares.push(boardColumnElement)
}

export function clearPieceMovementsHighlight() {
  highlightedBoardSquares.forEach((sqaureNode) => (sqaureNode.style.background = 'initial'))
  highlightedBoardSquares = []
}

export function swapNodes(selectedNode, targetNode) {
  const [selected, target] = [selectedNode.getAttribute('position'), targetNode.getAttribute('position')]
  const isValidMove =
    playingTurn === 'White'
      ? validMoves.some((val) => val + parseInt(selected) == parseInt(target))
      : validMoves.some((val) => val + parseInt(target) == parseInt(selected))
  validMoves = []
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
