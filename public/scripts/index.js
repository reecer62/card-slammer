console.log('FRONTEND TEST')
document.getElementById('submitBtn').onclick = function () {
  const data = getCardData()
  console.log(data)
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert(xhr.responseText)
    }
  }
  xhr.open('POST', '/')
  xhr.setRequestHeader('Content-Type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function getCardData () {
  const cards = []
  const cardObj = {}
  cardObj.name = document.getElementById('cardName').value
  cardObj.quantity = document.getElementById('numCards').value
  cards.push(cardObj)
  return cards
}
