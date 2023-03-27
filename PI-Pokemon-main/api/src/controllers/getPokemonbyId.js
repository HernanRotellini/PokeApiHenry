const {Pokemon} = require("../db");
const axios = require("axios")
const getPokemonbyId = async (req, res) => {
  try {
    const {idPokemon} = req.params;
    const apiResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
    const { id, name, stats, sprites, height, weight } = apiResponse.data;
    const front_default = sprites.front_default;
    const hp = stats.find((stat) => stat.stat.name === 'hp').base_stat;
    const attack = stats.find((stat) => stat.stat.name === 'attack').base_stat;
    const defense = stats.find((stat) => stat.stat.name === 'defense').base_stat;
    const speed = stats.find((stat) => stat.stat.name === 'speed').base_stat;
    const heightString = height + "ft";
    const weightString = weight + "lb";
    const poke = {
        idPokemon:id,
        name,
        image:front_default,
        hp,
        attack,
        defense,
        speed,
        height:heightString,
        weight:weightString,
      }
    res.json(poke);
  } catch (error) {
    const {idPokemon} = req.params;
    const poke = await Pokemon.findAll({
      where: {
        idPokemon: idPokemon,
      },
    });
    if(poke){
      res.json(poke);
    }else{
    res.status(500).json({ message: 'Internal server error' });
  }}
};
module.exports = getPokemonbyId;