const fs = require('fs')
const { join } = require('path')
const keys = new Map()

function getKey(name) {
  if (!keys.has(name)) {
    keys.set(name, fs.readFileSync(join(__dirname, `${name}`)))
  }
  return keys.get(name)
}

module.exports = getKey
