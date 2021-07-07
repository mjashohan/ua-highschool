const express = require('express')
const bodyParser = require('body-parser')

const usersRoutes =  require('./users.js')
const cors = require('cors')

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(cors())

app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    res.send('Kirreh mamma')
})

app.listen(PORT, () => {
    console.log(`Server running on port: http://localhost:${PORT}`)
})