const dal = require("./auth_db");

var getGames = function() {
    if(DEBUG) console.log("games.pg.dal.getGames()");
    return new Promise(function(resolve, reject) {

      const sql = "SELECT game_id AS _id, game_name,game_genre FROM videogame1"

      dal.query(sql, [], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };


  var getGameByGameId = function(id) {
    if(DEBUG) console.log("games.pg.dal.getGameByGameId()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT game_id AS _id, game_name, game_genre FROM videogame1 WHERE game_id = $1";
      dal.query(sql, [id], (err, result) => {
        if (err) {
          // logging should go here
          if(DEBUG) console.log(err);
          reject(err);
        } else {
          resolve(result.rows);
        }
      }); 
    }); 
  };


  var addGame = function(gamename, genre) {
    if(DEBUG) console.log("games.pg.dal.addGame()");
    return new Promise(function(resolve, reject) {
      const sql = "INSERT INTO videogame1 ( game_name, game_genre)VALUES ($1, $2);";
      dal.query(sql, [gamename, genre], (err, result) => {
        if (err) {
            if(DEBUG) console.log(err);
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  var deleteGame = function(id) {
    if(DEBUG) console.log("game.pg.dal.deleteGame()");
    return new Promise(function(resolve, reject) {
      const sql = "DELETE FROM videogame1 WHERE game_id = $1;";
      dal.query(sql, [id], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  var putGame = function(id, gameName, gameGenre) {
    if(DEBUG) console.log("games.pg.dal.putGame()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE videogame1 SET game_name=$2, game_genre=$3 WHERE game_id=$1;";
      dal.query(sql, [id,gameName,gameGenre], (err, result) => {
        if (err) {
            reject(err);
          } else {
            resolve(result.rows);
          }
      }); 
    });
  };

  var patchGame = function(id, gameName, gameGenre) {
    if(DEBUG) console.log("game.pg.dal.patchGame()");
    return new Promise(function(resolve, reject) {
      const sql = "UPDATE videogame1 SET game_name=$2, game_genre=$3 WHERE game_id=$1;";
      dal.query(sql, [id,gameName,gameGenre], (err, result) => {
        if (err) {
            reject(err);
          } else {
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
    patchGame
}