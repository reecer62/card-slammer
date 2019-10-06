const fs = require('fs')

const setData = fs.readFileSync('sets.json').toString()
const setDataStr = setData.substr(0, setData.length - 2) + ']'
const setDataParsed = JSON.parse(setDataStr)
console.log(setDataParsed)
