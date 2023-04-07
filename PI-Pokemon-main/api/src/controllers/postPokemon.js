const multer = require('multer');
const path = require('path');
const {Pokemon,Type} = require("../db");


// Configuración de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'C:/Proyectos/PokeApiHenry/PI-Pokemon-main/imagenes');
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 2000000, // Límite de tamaño de archivo en bytes
    fields: 10, // Límite de campos en el formulario
    parts: 20 // Límite de partes que el servidor puede recibir
  }
}).single('image');

async function createPokemon(req, res) {
    try {
      console.log(req.body);
      upload(req, res,async function (err) {
        if (err) {
          // Manejar el error si la carga de la imagen falla
          console.error(err);
          return res.status(500).send('Error al cargar la imagen.');
        }
        
        // Si se cargó la imagen con éxito, obtener su ruta
        const imagePath = req.file.path;
        // Obtener el objeto pokemon del cuerpo de la solicitud
        const pokemon = JSON.parse(req.body.data);
        console.log(pokemon.types);
        const heightString = pokemon.height + "ft";
        const weightString = pokemon.weight + "lb";
        const foundTypes = [];

        
        for (let type of pokemon.types) {
          const foundType = await Type.findOne({
            where: { name: type }
          });
          if (foundType) {
            foundTypes.push(foundType);
          }
        }
        
        
        const newPokemon = await Pokemon.create({
          name:pokemon.name,
          image: imagePath,
          hp:pokemon.hp,
          attack:pokemon.attack,
          defense:pokemon.defense,
          speed:pokemon.speed,
          height:heightString,
          weight:weightString,
          types: foundTypes.map(type => type.name)
        });
        await newPokemon.addTypes(foundTypes);
       
        res.status(201).json(newPokemon);
      })
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

module.exports = createPokemon;