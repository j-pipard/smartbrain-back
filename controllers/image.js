const clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: 'bf7ba06eb4164d44831840ed80e726fb',
})

const handleApiCall = (req, res) => {
app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
.then(data => res.send(data))
.catch(err => res.status(400).json('error while fetching image'))

}

const handleImage = (req, res, db) => {
  const { id } = req.body 
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
})
  .catch((err) => res.status(404).json('unable to get entries')) 
}

module.exports = {
  handleImage,
  handleApiCall
}