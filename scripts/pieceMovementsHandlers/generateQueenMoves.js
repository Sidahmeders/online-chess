import generateRookMoves from './generateRookMoves.js'
import generateBishopMoves from './generateBishopMoves.js'

export default function generateQueenMoves(pieceDAO) {
  const { straightMoves, diagonalMoves } = pieceDAO.pieceMoves

  generateBishopMoves(Object.assign(pieceDAO, { pieceMoves: diagonalMoves }))
  generateRookMoves(Object.assign(pieceDAO, { pieceMoves: straightMoves }))
}
