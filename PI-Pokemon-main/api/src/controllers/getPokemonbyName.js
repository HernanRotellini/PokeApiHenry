const {Pokemon,Type} = require("../db");
const axios = require("axios")
const { Op } = require('sequelize');
const getAllPokemons = require('./getAllPokemons')
const getPokemonbyName = async (req, res) => {
    try {
    
        const nombre = req.query.name.toLowerCase();
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        let pokemonList = [];
      
        // Si se encuentra en la API, agregar al pokemonList
       
            const {id, name, stats, sprites, height, weight,types } = response.data;
            const front_default = sprites.front_default;
            const hp = stats.find((stat) => stat.stat.name === 'hp').base_stat;
            const attack = stats.find((stat) => stat.stat.name === 'attack').base_stat;
            const defense = stats.find((stat) => stat.stat.name === 'defense').base_stat;
            const speed = stats.find((stat) => stat.stat.name === 'speed').base_stat;
            const heightString = height + "ft";
            const weightString = weight + "lb";
            const newName = name.charAt(0).toUpperCase() + name.slice(1);
            
            const poke = {
                id,
                name:newName,
                image:front_default,
                hp,
                attack,
                defense,
                speed,
                height:heightString,
                weight:weightString,
                types: types.map(type => type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1))
            }
            pokemonList.push(poke);
        
        let dbName = nombre.charAt(0).toUpperCase() + nombre.slice(1);
        // Buscar en la base de datos y agregar al pokemonList
        const dbPokemon = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${dbName}%`,
                },
            },
            include: [{ model: Type }],
        });
              
        if (dbPokemon) {
            const pokemonDB = dbPokemon.map(pokemon => {
                const {id, name, image, hp, attack, defense, speed, height, weight,types } = pokemon;
                const newName = name.charAt(0).toUpperCase() + name.slice(1);
                return {
                    id,
                    name:newName,
                    image,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    weight,
                    types: pokemon.Types.map((type) => type.name)
                };
            });
            pokemonList.push(...pokemonDB);
        }
        
        // Devolver el pokemonList
        if (pokemonList.length) {
            res.json(pokemonList);
          }
        
    } catch (error) {
        let pokemonList = [];
         if(pokemonList.length===0) {
        res.json(pokemonList)
        }else{
        res.status(404).json({ message: 'Pokemons not found' });
        }
        }
}
    
module.exports = getPokemonbyName;