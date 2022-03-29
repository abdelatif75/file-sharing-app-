const express = require('express')
const bodyParser = require('body-parser')
const multer  = require('multer')
const cors = require('cors')

const PORT = 5000

const app = express()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './../uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + file.originalname
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
  
const upload = multer({ storage: storage })

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('test')
})


app.listen(5000, () => {
    console.log(`http://localhost:${PORT}`)
})