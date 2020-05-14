require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http');
const https = require('https');
const fs = require('fs');
const morgan = require('morgan')
const path = require('path')

var accessLogStream = fs.createWriteStream(path.join(__dirname + '/logs/', 'access.log'), { flags: 'a' })

app.use(morgan('combined', { stream: accessLogStream }))

app.use(cors())

app.use(require('./controllers'))

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({error: "Internal Server Error 500"})
})


// app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));

if (process.env.SSL_ENABLED == 1) {
    let options = {
        key: fs.readFileSync(process.env.SSL_CERT_KEY),
        cert: fs.readFileSync(process.env.SSL_CERT_CERTIFICATE),
        ca: fs.readFileSync(process.env.SSL_CERT_CHAIN)
    };
    https.createServer(options, app).listen(process.env.PORT);
} else {
    http.createServer(app).listen(process.env.PORT);
}