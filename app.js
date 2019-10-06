const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const fs = require('fs')
const config = require('./config/config.json')

const setData = fs.readFileSync('sets.json').toString()
const setDataStr = setData.substr(0, setData.length - 2) + ']'
const sets = JSON.parse(setDataStr)

const cardData = fs.readFileSync('cardData.json').toString()
const cards = JSON.parse(cardData)

const app = express()
const port = 3000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.post('/', function (req, res) {
  const cardList = req.body
  const cardAggregate = []
  cardList.forEach(card => {
    const setName = parseSetName(card.name)
    const setId = getSetId(setName)
    const cardName = parseCardName(card.name)
    const cardId = getCardId(cardName)
    const cardImg = getCardImg(cardName)

    // get each card's info
    const data = null
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        // get api data
        const cardResponse = JSON.parse(this.responseText).results
        cardResponse.forEach(cardResponse => {
          if (cardResponse.subTypeName === 'Normal') {
            cardResponse.set = setId
            cardResponse.name = cardName
            cardResponse.img = cardImg
            cardAggregate.push(cardResponse)
          }
        })
      }
    })
    xhr.open('GET', `https://api.tcgplayer.com/v1.9.0/pricing/product/${cardId}`, false)
    xhr.setRequestHeader('Authorization', `Bearer ${config.bearer}`)
    xhr.send(data)
  })
  res.send(JSON.stringify(cardAggregate))
})

function parseSetName (cardName) {
  return cardName.match(/\[(.*?)\]/)[1].trim()
}

function parseCardName (cardName) {
  return cardName.match(/^(?:(?!\[).)*/)[0].trim()
}

function getSetId (setName) {
  for (let i = 0; i < sets.length; i++) {
    if (sets[i].abbreviation === setName) {
      return sets[i].name
    }
  }
  console.log('Did not find set id.')
}

function getCardId (cardName) {
  return cards[cardName].id
}

function getCardImg (cardName) {
  return cards[cardName].img
}

app.listen(port, () => {
  console.log(`Server started on port ${port}...`)
})
