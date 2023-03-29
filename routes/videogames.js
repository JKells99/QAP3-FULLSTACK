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


router.get('/:id', async (req, res) => {
    try {
        let aGame = await gamesDal.getGameByGameId(req.params.id);
        if (aGame.length === 0)
            res.render('norecord')
        else
            res.render('game', {aGame});
    } catch {
        res.render('503');
    }
});


router.post('/', async (req, res) => {
    if(DEBUG) console.log("games.POST");
    try {
        await gamesDal.addGame( req.body.gameName, req.body.gameGenre );
        res.redirect('/videogames/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    } 
});





module.exports = router