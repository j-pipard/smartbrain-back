const express = require('express')
let bcrypt = require('bcryptjs');
const cors = require('cors')
const knex = require('knex')
const app = express()

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const count = require('./controllers/count')

const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl :{
      rejectUnauthorized:false
    }
   
  }
});

const port = process.env.PORT || 3000




app.use(express.json())
app.use(cors())


app.get('/',(req,res) => { res.send('main page')})

app.get('/profile',(req,res) => { res.send('profile page')})

app.get('/profile/:id', (req, res) => count.handleCount(req, res, db))

app.put('/image', (req, res) => image.handleImage(req, res, db))

app.post('/signin', (req,res) => signin.handleSignin(req, res, bcrypt, db))

app.post('/register', (req,res) => register.handleRegister(req, res, bcrypt, db))

app.post('/imageUrl', (req, res) => image.handleApiCall(req, res))

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