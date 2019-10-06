
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const fs = require('fs')
const config = require('./config/config.json')

/* Get number of sets first and then map all sets to ID numbers */
var data = null
var xhr = new XMLHttpRequest()
xhr.addEventListener('readystatechange', function () {
  if (this.readyState === 4) {
    const numCards = parseInt(JSON.parse(this.responseText).totalItems)
    console.log('Cards: ' + numCards)
    parseCards(numCards)
    // fs.appendFile('cards.json', ']', function (err) {
    //   if (err) throw err
    //   console.log('Saved!')
    // })
  }
})
xhr.open('GET', 'http://api.tcgplayer.com/v1.9.0/catalog/products?categoryId=1&productTypes=Cards&offset=0&limit=1', false)
xhr.setRequestHeader('Authorization', `Bearer ${config.bearer}`)
xhr.send(data)

function parseCards (numCards) {
  // rewrite json file
  // fs.writeFile('card.json', '', () => { console.log('Destroyed cards data.') })
  // fs.appendFile('card.json', '[', function (err) {
  //   if (err) throw err
  //   console.log('Saved!')
  // })

  const numRequests = Math.ceil(numCards / 100)
  console.log(`Num Requests: ${numRequests}`)
  for (let i = 420; i < numRequests; i++) {
    console.log(i)
    const data = null
    const xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === 4) {
        // parse all cards in chunks
        const cards = JSON.parse(this.responseText).results

        // write each set to the file
        cards.forEach(card => {
          card.productConditions = null
          fs.appendFile('card.json', JSON.stringify(card) + ',', function (err) {
            if (err) throw err
            console.log('Saved!')
          })
        })
      }
    })
    xhr.open('GET', `http://api.tcgplayer.com/v1.9.0/catalog/products?categoryId=1&productTypes=Cards&offset=${i * 100}&limit=100`, false)
    xhr.setRequestHeader('Authorization', 'Bearer kmSGvedhvLphrRqZ_AQ5Vcg8puA2JiygNbewqnZQU7qdwqVGBhlSzyLCMZHQXgm3y0a6pP2JA4Hh7BzV8M3ACt_R637HMOj0-Vny691QPnOxOwFtJk3OvRO_SZ0Xhms25SOVxW_pT39NQT2xYwN7f2FVcwuuI2uyhaLVor6qpulTKys7nYyW5z2D0as6nttlTwf61E_vFu3kKqokNsovfxuiIPGOh8KxzcU4pyTHn-Zw9A4A_-4YQwFwiBjv1rxkVkPwqtuQQdEhhsRgS9cjZpghfKRrYQWpOPZnkV0s7P6AM8frUY2-Jj0Z3NdsahI5PplGtg')
    xhr.send(data)
  }
}
