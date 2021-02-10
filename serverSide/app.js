const express = require('express')
const port = 5050
const app = express()
const router = require('./router/index.js')

app.use(express.static(`${__dirname}/dist`))
app.use('/api', router)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/dist/index.html`)
})

app.listen(port, () => {
    console.log(`Listening at port: ${port}`)
})