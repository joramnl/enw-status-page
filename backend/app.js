require('dotenv').config()

const express = require('express')
const app = express()

app.use(require('./controllers'))

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({error: "Internal Server Error 500"})
})

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));