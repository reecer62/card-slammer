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
  slide_and_reveal()
}

//animations and sleep
function slide_and_reveal(){
	document.getElementById("search").style.left = "2.5vw";
	document.getElementById("search").classList.add("animated", "slideInRight");
	// above line just slides to the right since the card is already visible beforehand
	document.getElementById("results").style.left = "unset";
	document.getElementById("results").style.right = "2.5vw";
	document.getElementById("results").classList.add("animated", "fadeInRight");
 };
 async function slide_and_hide(){
	 // does not currently move positions back to initial
	document.getElementById("search").classList.remove("animated", "slideInRight");
	document.getElementById("results").classList.remove("animated", "fadeInRight");
	document.getElementById("results").classList.add("animated", "fadeOutRight");
	document.getElementById("search").classList.add("animated", "slideOutRight");
	// slideOutRight for search here is hacky. It only stays onscreen because its removed later
	// what I mean is that removing the animation after 1 second (when it finishes) unhides the box
	await sleep(1000);
	document.getElementById("results").classList.remove("animated", "fadeOutRight");
	document.getElementById("search").classList.remove("animated", "slideOutRight");
 }
function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
