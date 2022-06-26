const styles = {
  fenContainer: `
    color: red;
    font-size: 18px;
    border: 1px solid;
    border-radius: 2px;
    padding: 2px 5px;
    text-align: center;
  `,
  copyButton: `
    border: 1px solid #333;
    border-radius: 4px;
    margin-left: 10px;
    padding: 3px 9px;
  `,
}

export default function displayCurrentFen(currentFenPosition) {
  let fenContainer = document.getElementById('fen-placeholder')
  if (fenContainer === null) {
    fenContainer = document.createElement('div')
    fenContainer.id = 'fen-placeholder'
    fenContainer.style = styles.fenContainer
  }
  fenContainer.innerHTML = ''

  const fenPlaceholderSpan = document.createElement('span')
  fenPlaceholderSpan.innerText = currentFenPosition

  const copyFenButton = document.createElement('button')
  copyFenButton.style = styles.copyButton
  copyFenButton.innerText = 'copy'
  copyFenButton.onclick = (event) => {
    const fenString = event.target.parentNode.firstChild.innerText
    console.log(fenString) // TODO: copy this to our clipboard
  }

  fenContainer.appendChild(fenPlaceholderSpan)
  fenContainer.appendChild(copyFenButton)
  document.body.appendChild(fenContainer)
}
