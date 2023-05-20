const { readItems, writeItems } = require('./db/db')

async function loadItems (req, res, next) {
  req.items = await readItems()
  next()
}

async function saveItems (req, res, next) {
  console.log('writing items')
  await writeItems(req.items)
  next()
}

module.exports = {
  loadItems,
  saveItems
}