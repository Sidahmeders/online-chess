import validateMoves, { clearPieceMovementsHighlight, swapNodes } from './validateMoves.js'

let selectedNode = null

export default function addDragableEvents(nodeElement) {
  nodeElement.addEventListener('dragstart', dragStart)
  nodeElement.addEventListener('dragend', dragEnd)
  nodeElement.addEventListener('dragover', dragOver)
  nodeElement.addEventListener('dragenter', dragEnter)
  nodeElement.addEventListener('dragleave', dragLeave)
  nodeElement.addEventListener('drop', dragDrop)
}

function dragStart() {
  this.classList.add('hold')
  setTimeout(() => this.classList.add('invisible'), 0)
  validateMoves(this)
  selectedNode = this
}

function dragEnd() {
  this.classList.remove('invisible')
  this.classList.remove('hold')
  clearPieceMovementsHighlight()
}

function dragOver(event) {
  event.preventDefault()
}

function dragEnter(event) {
  event.preventDefault()
  this.classList.add('hovered')
}

function dragLeave() {
  this.classList.remove('hovered')
}

function dragDrop() {
  this.classList.remove('hovered')
  swapNodes(selectedNode, this)
}
