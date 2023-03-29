var router = require('express').Router();

if(DEBUG) {
    console.log('ROUTE: /api/videogames');
   
}
// http://localhost:3000/api/actors/
const gamesRouter = require('./videogames')
router.use('/videogames', gamesRouter);



module.exports = router;