const connectToMongo = require('./db')
const express = require('express')
const router = express.Router();
const cors = require('cors')
const cookieParser = require('cookie-parser');
connectToMongo()

const app = express()
const port = 5001

app.use(cors())
app.use(cookieParser())
app.use(express.json())

// available Routes

app.use('/api/auth', require('./routes/auth')) 


app.listen(port, () => {
  console.log(`Pencil Notes app listening on port ${port}`)
})

module.exports = router ;