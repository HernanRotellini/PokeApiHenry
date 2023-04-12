const {Pokemon,Type} = require("../db");
const axios = require("axios")
const { Op } = require('sequelize');
let pokemonList = [];
const getPokemonbyName = async (req, res) => {
    try {
        pokemonList=[]
        const nombre = req.query.name.toLowerCase();
        // Buscar en la base de datos y agregar al pokemonList
        const dbPokemon = await Pokemon.findAll({
            where: {
                name: {
                    [Op.iLike]: `${nombre}`,
                },
            },
            include: [{ model: Type }],
        });
              
        if (dbPokemon.length) {
            const pokemonDB = dbPokemon.map(pokemon => {
                const {id, name, image, hp, attack, defense, speed, height, weight } = pokemon;
                return {
                    id,
                    name,
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
        
        // Buscar en la API y agregar al pokemonList si se encuentra
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
       
        const pokemonAPI = response.data;
        if (pokemonAPI) {
            const {id, name, stats, sprites, height, weight,types } = pokemonAPI;
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
        }
       
        // Devolver el pokemonList lleno
        res.json(pokemonList);
        
    } catch (error) {
        if(pokemonList.length>0){
            res.json(pokemonList)
            pokemonList=[]
        }else{
            pokemonList=[]
        res.json(pokemonList)
        }
    }   
}
    
module.exports = getPokemonbyName;