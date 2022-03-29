export default function validateMoves(selectedNode, targetNode) {
  console.log(selectedNode, targetNode)

  targetNode.src = selectedNode.src
  selectedNode.src = ' '
}
