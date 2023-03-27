
const {Pokemon,Type} = require("../db");


async function createPokemon(req, res) {
    try {
      const { id, name, stats, sprites, height, weight } = req.body;
      const { front_default } = sprites;
     
        
     
for (let i = 0; i < stats.length; i++) {
  switch (stats[i].stat.name) {
    case "hp":
      hp = stats[i].base_stat;
      
    case "attack":
      attack = stats[i].base_stat;
     
    case "defense":
      defense = stats[i].base_stat;
   
    case "speed":
      speed = stats[i].base_stat;
     
    default:
     
      
  }
}
      
      const heightString = height + "ft";
      const weightString = weight + "lb";
      const types = req.body.types;
      const foundTypes = [];
for (let type of types) {
  const foundType = await Type.findOne({
    where: { name: type.type.name }
  });
  if (foundType) {
    foundTypes.push(foundType);
  } else {
    const newType = await Type.create({ name: type.type.name });
    foundTypes.push(newType);
  }
}
      // Asociar los tipos al pokemon
     
      const pokemon = await Pokemon.create({
        idPokemon:id,
        name:name,
        image: front_default,
        hp:hp,
        attack:attack,
        defense:defense,
        speed:speed,
        height:heightString,
        weight:weightString,
      });
      await pokemon.addTypes(foundTypes);
      res.status(201).json(pokemon);
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
      }
  }
  module.exports = createPokemon;