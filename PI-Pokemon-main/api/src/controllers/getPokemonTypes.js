const { conn } = require("../db");

const getPokemonTypes = async (req, res) => {
    const idPokemon = parseInt(req.params.idPokemon);
    try {
      const query = `SELECT "Types".name FROM "pokemon_types" JOIN "Types" ON "pokemon_types"."TypeId" = "Types".id WHERE "pokemon_types"."PokemonId" = ${idPokemon}`;
      const result = await conn.query(query);
     
     
      const types = result[0].map((type) => type.name);
      res.json(types);
   
    } catch (error) {
      res.status(500).send("Server error");
    }
  };

module.exports = getPokemonTypes;