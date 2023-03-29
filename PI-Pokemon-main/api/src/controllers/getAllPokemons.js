const {Pokemon} = require("../db");
const axios = require("axios")
const getAllPokemons = async (req, res) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
    const pokemons = await Pokemon.findAll();
    const pokemones = [pokemons,response.data]
    // Aquí se verifica si el nuevo Pokemon se encuentra en la tabla
    res.json(pokemones);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = getAllPokemons;