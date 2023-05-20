const express = require('express')
const app = express()

app.use(express.json())

const controller = require('./controller')
const { loadItems } = require('./loaditems')

app.use('/', loadItems, controller)

app.listen(8383, () => console.log('hi'))