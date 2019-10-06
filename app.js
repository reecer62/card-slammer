const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.post('/', function (req, res) {
  console.log(req.body)
  res.send('EAT CAKE')
})

app.listen(port, () => {
  console.log(`Server started on port ${port}...`)
})
