var router = require('express').Router();
const gamesDal = require('../../services/pg.games.dal')

// SETTING UP LOGGER
const logEvents = require("../../logevents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));

// api/games

router.get('/', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/videogames/ GET ' + req.url);
    try {
        let theGames = await gamesDal.getGames(); 
        res.json(theGames);
    } catch {
        myEmitter.emit(
            "log",
            "api/getGames())",
            "ERROR",
            "getGames API function has failed  "
          );
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
});

router.get('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/videogames/:id GET ' + req.url);
    try {
        let aGame = await gamesDal.getGameByGameId(req.params.id); 
        if (aGame.length === 0) {
            myEmitter.emit(
                "log",
                "api/videogames/:id",
                "ERROR",
                "Getting By ID API Failed"
              );
            
            res.statusCode = 404;
            res.json({message: "Not Found", status: 404});
        }
        else
            res.json(aGame);
            
    } catch {
        myEmitter.emit(
            "log",
            "api/videogames/:id",
            "ERROR",
            "API GET FAILED USING ID PARARM"
          );
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
  });


  router.post('/', async (req, res) => {
    if(DEBUG) { 
        console.log('ROUTE: /api/videogames/ POST');
    
    }
    try {
        await gamesDal.addGame(req.body.gameName, req.body.gameGenre );
        res.statusCode = 201;
        res.json({message: "Created", status: 201});
    } catch {
        myEmitter.emit(
            "log",
            "api/videogames/ POST",
            "ERROR",
            "API POST FAILED"
          );
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    } 
  });

  router.patch('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/videogames PATCH ' + req.params.id);
    try {
        await gamesDal.patchGame(req.params.id, req.body.gameName, req.body.gameGenre);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        myEmitter.emit(
            "log",
            "api/videogames/ PATCH",
            "ERROR",
            "API PATCH FAILED"
          );
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
  });

  router.put('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/videogames PUT ' + req.params.id);
    try {
        await gamesDal.putGame(req.params.id, req.body.gameName, req.body.gameGenre);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        myEmitter.emit(
            "log",
            "api/videogames/ PUT",
            "ERROR",
            "API Put FAILED "
          );
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
  });
  router.delete('/:id', async (req, res) => {
    if(DEBUG) console.log('ROUTE: /api/videogames DELETE ' + req.params.id);
    try {
        await gamesDal.deleteGame(req.params.id);
        res.statusCode = 200;
        res.json({message: "OK", status: 200});
    } catch {
        myEmitter.emit(
            "log",
            "api/videogames/ delete",
            "ERROR",
            "SERVER ERROR 503"
          );
        res.statusCode = 503;
        res.json({message: "Service Unavailable", status: 503});
    }
  });

module.exports = router;