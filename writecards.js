const fs = require('fs')

const cardData = fs.readFileSync('card.json').toString()
const cards = JSON.parse(cardData)

const cardList = {}
cards.forEach(card => {
    cardList[card.productName] = card.productId
})

fs.writeFileSync('cardData.json', JSON.stringify(cardList), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
})