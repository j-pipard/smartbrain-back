const handleRegister = (req, res, bcrypt, db) => {
  const { email, name, password } = req.body

  if(!email || !name || !password) {
    return res.status(400).json("Invalid Form Submission")
  } 

    const hash = bcrypt.hashSync(password)
    db.transaction(trx => {
      trx.insert({
        hash,
        email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
          email: loginEmail[0],
          name,
          joined: new Date()
        }).then(user => {
          res.json(user[0])
        })
      })
      .then(trx.commit)
      .catch(trx.rollback)
    }).catch(err => res.status(400).json('unable to join'))
}

module.exports = {
  handleRegister 
}