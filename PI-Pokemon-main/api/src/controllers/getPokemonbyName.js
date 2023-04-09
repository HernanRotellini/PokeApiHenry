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
                types: types.map(type =>{return type.type.name})
            }
            pokemonList.push(poke);
        
        
        // Buscar en la base de datos y agregar al pokemonList
        const dbPokemon = await Pokemon.findAll({
            where: {
                name: {
                    [Op.like]: `%${nombre}%`,
                },
            },
        });
              
        if (dbPokemon.length) {
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
                };
            });
            pokemonList.push(...pokemonDB);
        }
        
        // Devolver el pokemonList
        if (pokemonList.length) {
            res.json(pokemonList);
            return; 
          }
        
    } catch (error) {
        let pokemonList = [];
        if(!pokemonList.length) {
            const isFirstRequest = true
            let apiPokemons= [];
            if (isFirstRequest) {
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=40");
                const { results } = response.data;
                const pokemonPromises = results.map(async (pokemon) => {
                  const Apiresponse = await axios.get(pokemon.url);
                  const { id, name, stats, sprites, height, weight } = Apiresponse.data;
                  const { front_default } = sprites;
                  const hp = stats.find((stat) => stat.stat.name === "hp").base_stat;
                  const attack = stats.find((stat) => stat.stat.name === "attack").base_stat;
                  const defense = stats.find((stat) => stat.stat.name === "defense").base_stat;
                  const speed = stats.find((stat) => stat.stat.name === "speed").base_stat;
                  const heightString = height + "ft";
                  const weightString = weight + "lb";
                  const { types } = Apiresponse.data;
                  const foundTypes = [];
          
                  for (let type of types) {
                    const typeName = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1);
                    const foundType = await Type.findOne({
                      where: { name: typeName },
                    });
                    if (foundType) {
                      foundTypes.push(foundType);
                    } else {
                      const newType = await Type.create({ name: typeName });
                      foundTypes.push(newType);
                    }
                  }
                  const pokeName = name.charAt(0).toUpperCase() + name.slice(1);
                  const poke = {
                    id: id,
                    name: pokeName,
                    image: front_default,
                    hp: hp,
                    attack: attack,
                    defense: defense,
                    speed: speed,
                    height: heightString,
                    weight: weightString,
                    types: foundTypes.map((type) => type.name),
                  };
                  
                  apiPokemons.push(poke);
                });
                await Promise.all(pokemonPromises);
               
              }
           
             const dbPokemons = await Pokemon.findAll({
              include: [{ model: Type, attributes: ["name"] }],
            }).then((pokemons) =>
              pokemons.map((pokemon) => ({
                id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                types: pokemon.Types.map((type) => type.name),
              }))
            );
            let allPokemons = dbPokemons.concat(apiPokemons);
             res.json(allPokemons);
        }else{
        res.status(404).json({ message: 'Pokemons not found' });
        }
        }
}
    
module.exports = getPokemonbyName;