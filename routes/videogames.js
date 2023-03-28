const express = require('express');
const router = express.Router()

const gamesDal = require('../services/pg.games.dal')

router.get('/', async (req, res) =>{
    try {
        let theGames = await gamesDal.getGames();
        if(DEBUG) console.table(theGames)
        res.render('games', {theGames})
    } catch{
        res.render('503')
        
    }
})

module.exports = router