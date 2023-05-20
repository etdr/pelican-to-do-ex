const router = require('express').Router()
const { v4: uuid } = require('uuid')
const { writeItems } = require('./db/db')


router.get('/all', (req, res) => {
  res.json(req.items)
})

router.post('/new', async (req, res) => {
  const item = {
    id: uuid(),
    content: req.body.content,
    complete: false
  }
  req.items.push(item)
  await writeItems(req.items)
  res.json(item)
})

router.patch('/:id/check', async (req, res) => {
  const item = req.items.find(t => t.id === req.params.id)
  item.complete = true
  await writeItems(req.items)
  res.json(item)
})

router.patch('/:id/uncheck', async (req, res) => {
  const item = req.items.find(t => t.id === req.params.id)
  item.complete = false
  await writeItems(req.items)
  res.json(item)
})

router.patch('/:id/content', async (req, res) => {
  const item = req.items.find(t => t.id === req.params.id)
  item.content = req.body.content
  await writeItems(req.items)
  res.json(item)
})


// endpoint that deletes all the items where complete is true
router.delete('/completed', async (req, res) => {
  const initialCount = req.items.length
  req.items = req.items.filter(t => !t.completed)
  await writeItems(req.items)
  res.send(`deleted ${initialCount - req.items.length} items`)
})


module.exports = router