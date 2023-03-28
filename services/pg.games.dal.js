const dal = require("./auth_db");

var getGames = function() {
    if(DEBUG) console.log("games.pg.dal.getGames()");
    return new Promise(function(resolve, reject) {
      const sql = "SELECT game_id AS _id, game_name, game_genre game_releasedate, game_coverart FROM videogame ORDER BY game_id DESC LIMIT 7;"
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

  module.exports = {
    getGames
  }