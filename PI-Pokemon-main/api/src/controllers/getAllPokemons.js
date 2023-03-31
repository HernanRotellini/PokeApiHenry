const {Pokemon,Type} = require("../db");

const getAllPokemons = async (req, res) => {
  try {
   
    const pokemons = await Pokemon.findAll( {include: {
      model: Type,
      attributes: ['name'],
    }});
    
    // Aquí se verifica si el nuevo Pokemon se encuentra en la tabla
    res.json(pokemons);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = getAllPokemons;