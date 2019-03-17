const express = require('express')
const router = express.Router()

const users = [
  { id: 1, name: 'Zack Webster' },
  { id: 2, name: 'Zord Axelrod' },
  { id: 3, name: 'Emilia Clark' }
]

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  if (users.some(user => user.id === parseInt(id))) {
    res.json(users.filter(user => user.id === parseInt(id))[0])
  } else {
    res.status(404).send('User not found')
  }
})

router.post('/', (req, res) => {
  const { name } = req.body
  const user = {
    id: users.length + 1,
    name: name
  }
  users.push(user)
  res.json(user)
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  if (users.some(user => user.id === parseInt(id))) {
    const user = users.filter(user => user.id === parseInt(id))[0]
    user.name = req.body.name
    res.json(user)
  } else {
    res.status(404).send('User not found')
  }
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  const index = users.map(user => user.id).indexOf(parseInt(id))
  if (index !== -1) {
    users.pop(index)
    res.send('User removed')
  } else {
    res.status(404).send('User not found')
  }
})

module.exports = router
