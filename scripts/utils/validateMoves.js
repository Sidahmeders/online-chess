export default function validateMoves(selectedNode, targetNode) {
  console.log(selectedNode?.id, targetNode?.id)

  targetNode.src = selectedNode.src
  selectedNode.src = ' '
}

/*
  "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
   |                                           | |    | | |
   1                                           2 3    4 5 6

  
  1. Pieces placements.
  2. who moves next, "w" -> White's turn, "b" Black's turn.
  3. Castling Rights.
  4. Possible En Passant Targets.
  5. Halfmove Clock (50-move draw), when counter reaches 100 the game ends in a draw.
  6. Fullmove Number (number of completed turns).
*/

/*
  setup the board
*/
