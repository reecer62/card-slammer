var cards = []

function addCard () {
  var node = document.createElement('P')
  var num = document.getElementById('number').value
  var name = document.getElementById('name').value
  var text = num + 'x ' + name
  var textnode = document.createTextNode(text)
  node.appendChild(textnode)
  document.getElementById('box').appendChild(node)
  cards.push({
    number: num,
    name: name
  })
  console.log('Card pushed to list.')
}

document.getElementById('submitBtn').onclick = function () {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Receive tcgplayer data and render in dom
      // Trigger animation
      const cardData = xhr.responseText
      console.log(cardData)
    }
  }
  xhr.open('POST', '/', false)
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(cards))
  document.getElementById('results').style.visibility = 'visible'
}
