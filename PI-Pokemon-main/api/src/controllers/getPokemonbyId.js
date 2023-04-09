const {Pokemon,Type} = require("../db");
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
    const {types} = apiResponse.data
    const pokeName = name.charAt(0).toUpperCase() + name.slice(1);
    const poke = {
        id:id,
        name:pokeName,
        image:front_default,
        hp,
        attack,
        defense,
        speed,
        height:heightString,
        weight:weightString,
        types: types.map((type) => {
          const typeName = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
        return typeName}),
      }
    res.json(poke);
  } catch (error) {
    const {idPokemon} = req.params;
    const poke = await Pokemon.findOne({
      where: {
        id: idPokemon,
      },
      include: [{ 
        model: Type, 
       }],
    });
   
    const dbpokemonDetail= {
      name: poke.name,
      image: poke.image,
      hp: poke.hp,
      attack: poke.attack,
      defense: poke.defense,
      speed: poke.speed,
      weight: poke.weight,
      height: poke.height,
      types: poke.Types?.map((type) => {
        const typeName = type.name.charAt(0).toUpperCase() + type.name.slice(1);
      return typeName})
    }
  
    if(dbpokemonDetail){
      res.json(dbpokemonDetail);
    }else{
    res.status(500).json({ message: 'Internal server error' });
  }}
};
module.exports = getPokemonbyId;