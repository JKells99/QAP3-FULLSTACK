const express = require('express');
const router = express.Router()

const gamesDal = require('../services/pg.games.dal')



// SETTING UP LOGGER
const logEvents = require("../logevents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));


// Get
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
        myEmitter.emit(
            "log",
            "getGameByGameId()",
            "ERROR",
            "GET GAME BY GAME ID FAILED"
          );
    }
});

// Post
router.post('/', async (req, res) => {
    if(DEBUG) console.log("games.POST");
    try {
        await gamesDal.addGame( req.body.gameName, req.body.gameGenre );
        myEmitter.emit(
            "log",
            "game.POST()",
            "INFO",
            "GAME has been added to the list"
          );
        res.redirect('/videogames/');
        
    } catch {
        myEmitter.emit(
            "log",
            "games.post())",
            "ERROR",
            "POST games has failed "
          );
        
        res.render('503');
    } 
});

// Delete
router.get('/:id/delete', async (req, res) => {
    if(DEBUG) console.log('game.Delete() : ' + req.params.id);
    res.render('gamedelete.ejs', {gamename: req.query.gameName, gamegenre: req.query.gameGenre, theId: req.params.id});
   
});

router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('games.DELETE(): ' + req.params.id);
    try {
        await gamesDal.deleteGame(req.params.id);
        myEmitter.emit(
            "log",
            "game.Delete()",
            "INFO",
            "GAME has been deleted from Database"
          );
        res.redirect('/videogames/');
    } catch {
        myEmitter.emit(
            "log",
            "games.DELETE())",
            "ERROR",
            "DELETE games has failed "
          );
        
        res.render('503');
    }
});

//  Put
router.get('/:id/replace', async (req, res) => {
    if(DEBUG) console.log('game.Replace : ' + req.params.id);
    res.render('gamePut.ejs', {gameName: req.query.gameName, gameGenre: req.query.gameGenre, theId: req.params.id});
    
});

router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('games.PUT: ' + req.params.id);
    try {
        await gamesDal.putGame(req.params.id, req.body.gameName, req.body.gameGenre);
        myEmitter.emit(
            "log",
            "games.Replace())",
            "INFO",
            "Game Info Has Been Updated By PUT "
          );
        res.redirect('/videogames/');
    } catch {
        myEmitter.emit(
            "log",
            "games.PUT())",
            "ERROR",
            "PUT games has failed "
          );
        res.render('503');
    }
});

// Patch 
router.get('/:id/edit', async (req, res) => {
    if(DEBUG) console.log('game.Edit : ' + req.params.id);
    res.render('gamePatch.ejs', {gamename: req.query.gameName, gamegenre: req.query.gameGenre, theId: req.params.id});
    
});

router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('games.PATCH: ' + req.params.id);
    try {
        await gamesDal.patchGame(req.params.id, req.body.gameName, req.body.gameGenre);
        myEmitter.emit(
            "log",
            "games.Edit())",
            "INFO",
            "Game Info Has Been Updated By PATCH "
          );
        res.redirect('/videogames/');
    } catch {
        myEmitter.emit(
            "log",
            "game.Edit())",
            "ERROR",
            "PATCH games has failed "
          );
        
        res.render('503');
    }
});









module.exports = router