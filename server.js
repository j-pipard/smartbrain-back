const express = require('express')

const app = express()

const port = 3002

const database = {
  users : [
    {
      id: '123',
      name: 'John',
      email: 'john@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'Sally',
      email: 'Sally@email.com',
      password: 'bananas',
      entries: 0,
      joined: new Date()
    },

  ]
}

app.use(express.json())

app.get('/',(req,res) => {
  res.json('this is working')
})


app.get('/profile',(req,res) => {
  res.json(database.users)
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params 
  let found = false
  database.users.forEach((user) => {
    if(user.id === id) {
      found = true
      return (
        res.send(user)
      )
    }
  })
  if(!found) {
    return (
      res.status(404).json('not found')
    )
  }
})

app.post('/image', (req, res) => {
  const { id } = req.body 
  let found = false
  database.users.forEach((user) => {
    if(user.id === id) {
      found = true
      user.entries++
      return (res.json(user.entries))
    }
  })
  if(!found) {
    return (
      res.status(404).json('not found')
    )
  }
})

app.post('/signin', (req,res) => {
  if((req.body.email === database.users[0].email && req.body.password === database.users[0].password ) )
    {
      res.json('logged in')
    } else {
      res.status(400).json('error logging in')
    }
})

app.post('/register', (req,res) => {
  const { email, name, password } = req.body
  database.users.push({
    id: '125',
      name: name,
      email: email,
      password: password,
      entries: 0,
      joined: new Date()
  })
  res.send(database.users[database.users.length-1])
})

app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})

/*
/ --> res this is working
/signin : POST = success/failure
/register : POST = user
/profile/:userid--> GET  = USER
/image --> PUT --> user


*/