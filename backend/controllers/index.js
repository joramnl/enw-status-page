const express = require('express')
const router = express.Router()
const package_info = require('../package.json')

router.use('/servers', require('./servers'))

router.get('/', (req, res) => {
    res.send({
        package: {
            name: package_info.name,
            author: package_info.author,
            version: package_info.version,
        },
        time: new Date().toUTCString()
    })
})

router.get('*', (req, res) => res.json({error: "Not Found 404"}))

module.exports = router