export default function parseFen(fenString) {
  let PiecesPlacements
  let WhoMovesNext
  let CastlingRights
  let PossibleEnPassantTargets
  let HalfmoveClock
  let FullmoveCounter

  fenString.split(' ').forEach((notation, index) => {
    if (index === 0) PiecesPlacements = notation
    if (index === 1) WhoMovesNext = notation
    if (index === 2) CastlingRights = notation
    if (index === 3) PossibleEnPassantTargets = notation
    if (index === 4) HalfmoveClock = notation
    if (index === 5) FullmoveCounter = notation
  })

  return { PiecesPlacements, WhoMovesNext, CastlingRights, PossibleEnPassantTargets, HalfmoveClock, FullmoveCounter }
}
