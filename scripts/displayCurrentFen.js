const styles = `
  color: red;
  font-size: 18px;
  border: 1px solid;
  border-radius: 2px;
  padding: 2px 5px;
  text-align: center;
`

export default function displayCurrentFen(currentFenPosition) {
  const fenPlaceholderElement = document.createElement('div')
  fenPlaceholderElement.style = styles
  fenPlaceholderElement.innerText = currentFenPosition

  document.body.appendChild(fenPlaceholderElement)
}
