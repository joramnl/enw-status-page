const express = require('express')
const router = express.Router()

const ServerQuery = require('gamedig')

router.all('/', (req, res) => res.json({error: "No port specified"}))

router.get('/:serverPort', (req, res) => {
    let port = req.params.serverPort

    if (process.env.SERVER_IP == "") throw new Error("Server IP is not defined")

    ServerQuery.query({
        type: 'csgo',
        host: process.env.SERVER_IP,
        port
    }).then((state) => {
        let server_name = state.name;
        let current_map = state.map;
        let max_players = state.maxplayers
        let playercount = state.players.length

        res.json({
            server_name,
            current_map,
            max_players,
            playercount,
            format: playercount + "/" + max_players
        })
    }).catch((error) => {
        console.error(error)
        res.json({error})
    });
})

module.exports = router