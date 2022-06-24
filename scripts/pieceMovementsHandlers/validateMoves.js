import { PIECES, getPieceTypeFromNumber, PIECES_MOVES, buildFenString, FEN_STARTING_POSITION } from '../setup.js'
import generatePawnMoves from './generatePawnMoves.js'
import generateKingMoves from './generateKingMoves.js'
import generateBishopMoves from './generateBishopMoves.js'
import generateRookMoves from './generateRookMoves.js'
import generateKnightMoves from './generateKnightMoves.js'
import generateQueenMoves from './generateQueenMoves.js'

export const _state = {
  highlightedBoardSquares: [],
  validMoves: null,
  playerTurn: 8,
  currentFenPosition: FEN_STARTING_POSITION,
}

export default function validateMoves(selectedNode) {
  if (!checkPlayersTurn(selectedNode.id)) return
  const pieceDAO = buildPieceDAO(selectedNode)
  _state.validMoves = []
  _state.currentFenPosition = buildFenString(pieceDAO.virtualBoardArray)

  /* eslint-disable indent */
  switch (pieceDAO.pieceType) {
    case 'Pawn':
      generatePawnMoves(pieceDAO)
      break
    case 'King':
      generateKingMoves(pieceDAO)
      break
    case 'Queen':
      generateQueenMoves(pieceDAO)
      break
    case 'Bishop':
      generateBishopMoves(pieceDAO)
      break
    case 'Rook':
      generateRookMoves(pieceDAO)
      break
    case 'Knight':
      generateKnightMoves(pieceDAO)
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

function checkPlayersTurn(pieceID) {
  const pieceColor = getPieceColor(pieceID)
  const playerTurnColor = getPieceColor(_state.playerTurn)
  return pieceColor === playerTurnColor
}

function buildPieceDAO(selectedNode) {
  const boardContainer = document.getElementById('board-container')
  const { boardArray, virtualBoardArray } = createBoardArrays(boardContainer)
  const pieceType = getPieceTypeFromNumber(selectedNode.id)
  const pieceMoves = PIECES_MOVES()[pieceType]
  return { boardArray, virtualBoardArray, pieceType, pieceMoves, selectedNode }
}

export function getPieceColor(pieceID) {
  if (pieceID == 0) return 'Empty'
  if (pieceID <= 14) return 'White'
  if (pieceID >= 16) return 'Black'
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
  _state.playerTurn = _state.playerTurn === 8 ? _state.playerTurn << 1 : _state.playerTurn >> 1
}
