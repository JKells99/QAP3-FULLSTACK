// SETTING UP LOGGER
const logEvents = require("../logevents");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}

// initialize an new emitter object
const myEmitter = new MyEmitter();
// add the listener for the logEvent
myEmitter.on("log", (event, level, msg) => logEvents(event, level, msg));


const dal = require("./auth_db");

var getGames = function () {
  if (DEBUG) console.log("games.pg.dal.getGames()");
  return new Promise(function (resolve, reject) {
    const sql = "SELECT game_id AS _id, game_name,game_genre FROM videogame1";

    dal.query(sql, [], (err, result) => {
      if (err) {
        myEmitter.emit(
          "log",
          "getGames())",
          "ERROR",
          "getGames() function has failed  "
        );
        if (DEBUG) console.log(err);
        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "getGames())",
          "INFO",
          "Games List Has Been Accessed  "
        );
        resolve(result.rows);
      }
    });
  });
};

var getGameByGameId = function (id) {
  return new Promise(function (resolve, reject) {
    const sql =
      "SELECT game_id AS _id, game_name, game_genre FROM videogame1 WHERE game_id = $1";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "getGameByGameId())",
          "ERROR",
          "getGameByGameId() function has failed  "
        );

        
        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "getGamesByGameID())",
          "INFO",
          "A Specific Game  Has Been Accessed"
        );
        resolve(result.rows);
      }
    });
  });
};

var addGame = function (gamename, genre) {
  if (DEBUG) console.log("games.pg.dal.addGame()");
  return new Promise(function (resolve, reject) {
    const sql =
      "INSERT INTO videogame1 ( game_name, game_genre)VALUES ($1, $2);";
    dal.query(sql, [gamename, genre], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "addGame())",
          "ERROR",
          "addGame function has failed  "
        );
        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "addGame())",
          "INFO",
          "A Game Has Been Added To The List  "
        );
        resolve(result.rows);
      }
    });
  });
};

var deleteGame = function (id) {
  if (DEBUG) console.log("game.pg.dal.deleteGame()");
  return new Promise(function (resolve, reject) {
    const sql = "DELETE FROM videogame1 WHERE game_id = $1;";
    dal.query(sql, [id], (err, result) => {
      if (err) {
        if (DEBUG) console.log(err);
        myEmitter.emit(
          "log",
          "deleteGame())",
          "ERROR",
          "deleteGame function has failed  "
        );

        reject(err);
      } else {
        myEmitter.emit(
          "log",
          "deleteGame())",
          "WARN",
          "a Game Has Been Deleted From The List "
        );
        resolve(result.rows);
      }
    });
  });
};

var putGame = function (id, gameName, gameGenre) {
  if (DEBUG) console.log("games.pg.dal.putGame()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE videogame1 SET game_name=$2, game_genre=$3 WHERE game_id=$1;";
    dal.query(sql, [id, gameName, gameGenre], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err)
        myEmitter.emit(
          "log",
          "putGame())",
          "ERROR",
          "Put function has failed  "
        );
        reject(err);
        
      } else {
        myEmitter.emit(
          "log",
          "putGame())",
          "INFO",
          "Game Info Has Been Updated  "
        );
        resolve(result.rows);
      }
    });
  });
};

var patchGame = function (id, gameName, gameGenre) {
  if (DEBUG) console.log("game.pg.dal.patchGame()");
  return new Promise(function (resolve, reject) {
    const sql =
      "UPDATE videogame1 SET game_name=$2, game_genre=$3 WHERE game_id=$1;";
    dal.query(sql, [id, gameName, gameGenre], (err, result) => {
      if (err) {
        if(DEBUG) console.log(err)
        myEmitter.emit(
          "log",
          "patchGame())",
          "ERROR",
          "patchGame function has failed  "
        );
        reject(err);
        
      } else {
        myEmitter.emit(
          "log",
          "patchGame())",
          "Info",
          "Game Info Has Been Updated  "
        );
        resolve(result.rows);
      }
    });
  });
};

module.exports = {
  getGames,
  addGame,
  getGameByGameId,
  deleteGame,
  putGame,
  patchGame,
};
