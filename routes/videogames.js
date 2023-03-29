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

router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('actor.Delete() : ' + req.params.id);
    res.render('gamedelete.ejs', {gamename: req.query.gameName, gamegenre: req.query.gameGenre, theId: req.params.id});
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('games.DELETE(): ' + req.params.id);
    try {
        await gamesDal.deleteGame(req.params.id);
        res.redirect('/videogames/');
    } catch {
        // log this error to an error log file.
        res.render('503');
    }
});


router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('game.Replace : ' + req.params.id);
    res.render('gamePut.ejs', {gameName: req.query.gameName, gameGenre: req.query.gameGenre, theId: req.params.id});
});

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('games.PUT: ' + req.params.id);
    try {
        await gamesDal.putGame(req.params.id, req.body.gameName, req.body.gameGenre);
        res.redirect('/videogames/');
    } catch {
        console.log("NOT COOL")
        // log this error to an error log file.
        res.render('503');
    }
});







module.exports = router