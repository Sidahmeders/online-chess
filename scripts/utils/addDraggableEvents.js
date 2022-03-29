import validateMoves from './validateMoves.js'

export default function addDragableEvents(nodeElement) {
  nodeElement.addEventListener('dragstart', dragStart)
  nodeElement.addEventListener('dragend', dragEnd)
  nodeElement.addEventListener('dragover', dragOver)
  nodeElement.addEventListener('dragenter', dragEnter)
  nodeElement.addEventListener('dragleave', dragLeave)
  nodeElement.addEventListener('drop', dragDrop)
}

let selectedNode

function dragStart() {
  this.classList.add('hold')
  setTimeout(() => this.classList.add('invisible'), 0)

  selectedNode = this
}

function dragEnd() {
  this.classList.remove('invisible')
  this.classList.remove('hold')
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

  validateMoves(selectedNode, this)
}
