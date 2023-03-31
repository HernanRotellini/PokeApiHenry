const {Pokemon} = require("../db");
const axios = require("axios")
const { Op } = require('sequelize');
const getPokemonbyName = async (req, res) => {
    try {
            const nombre = req.query.name.toLowerCase();
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
            const { id, name, stats, sprites, height, weight } = response.data;
            const front_default = sprites.front_default;
            const hp = stats.find((stat) => stat.stat.name === 'hp').base_stat;
            const attack = stats.find((stat) => stat.stat.name === 'attack').base_stat;
            const defense = stats.find((stat) => stat.stat.name === 'defense').base_stat;
            const speed = stats.find((stat) => stat.stat.name === 'speed').base_stat;
            const heightString = height + "ft";
            const weightString = weight + "lb";
            const poke = {
                id:id,
                name,
                image:front_default,
                hp,
                attack,
                defense,
                speed,
                height:heightString,
                weight:weightString,}
            res.json(poke);
          } catch (error) {
            // Si no se encuentra en la API, la promesa falla y va al error, 
            // busca en la base de datos,en caso de no encontrar un pokemon tira un 404
            const nombre = req.query.name
            const dbPokemon = await Pokemon.findAll({
                where: {
                  name: {
                    [Op.like]: `%${nombre}%`,
                  },
                },
              });
              
              if (dbPokemon.length) {
                const pokemonList = dbPokemon.map(pokemon => {
                  const { idPokemon, name, image, hp, attack, defense, speed, height, weight } = pokemon;
                  return {
                    id:idPokemon,
                    name,
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                  };
                });
              
                res.json(pokemonList);
            }
            else{
                res.status(404).json({ message: 'Pokemons not found' });
            }
          }
        }
     
    
module.exports = getPokemonbyName;