const multer = require('multer');
const path = require('path');
const {Pokemon,Type} = require("../db");

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, '/PI-Pokemon-main/imagenes');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single('image');;



async function createPokemon(req, res) {
    try {
      upload(req, res,async function (err) {
        if (err) {
          // Manejar el error si la carga de la imagen falla
          console.error(err);
          return res.status(500).send('Error al cargar la imagen.');
        }
      
        // Si se cargó la imagen con éxito, obtener su ruta
        const imagePath = req.file.path;
      })   
    const { id, name, stats, height, weight } = req.body;
    //const { front_default } = sprites;
    const hp = stats.find((stat) => stat.stat.name === 'hp').base_stat;
    const attack = stats.find((stat) => stat.stat.name === 'attack').base_stat;
    const defense = stats.find((stat) => stat.stat.name === 'defense').base_stat;
    const speed = stats.find((stat) => stat.stat.name === 'speed').base_stat;
    const heightString = height + "ft";
    const weightString = weight + "lb";
    const {types} = req.body
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
        id:id,
        name:name,
        image: imagePath,
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