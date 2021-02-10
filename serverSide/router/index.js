const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')
const nano = require ('nano')('http://hrdapps50:5984') //10.168.71.89
const myEstimation = nano.use('delo_estimation')

router.use(cors())
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())

router.get('/', (req, res) => {
    res.send('api landing page')
})


// ******* icad estimation

router.post('/estimation', (req, res) => {
    myEstimation.insert(req.body).then(body => {
        res.send(body)
    })
})

router.get('/estimations', (req, res) => {
    myEstimation.view('delo', 'ConstructionCode', {
        include_docs: true
    }).then(body => {
        let toSend = body.rows.map(rec => {
            return rec.doc
        })
        res.send(toSend)
    })
})



module.exports = router