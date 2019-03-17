const express = require('express')
const router = express.Router()

const messages = [
  { id: 1, content: 'Good morning' },
  { id: 2, content: 'Good afternoon' },
  { id: 3, content: 'Good night' }
]

router.get('/', (req, res) => {
  res.json(messages)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  if (messages.some(message => message.id === parseInt(id))) {
    res.json(messages.filter(message => message.id === parseInt(id))[0])
  } else {
    res.status(404).send('Message not found')
  }
})

router.post('/', (req, res) => {
  const { content } = req.body
  const message = {
    id: messages.length + 1,
    content: content
  }
  messages.push(message)
  res.json(message)
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (messages.some(message => message.id === parseInt(id))) {
    const message = messages.filter(message => message.id === parseInt(id))[0]
    message.content = req.body.content
    res.json(message)
  } else {
    res.status(404).send('Message not found')
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const index = messages.map(message => message.id).indexOf(parseInt(id))
  if (index !== -1) {
    messages.pop(index)
    res.send('message removed')
  } else {
    res.status(404).send('Message not found')
  }
})

module.exports = router
