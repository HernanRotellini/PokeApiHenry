const multer = require('multer');
const path = require('path');
const {Pokemon,Type} = require("../db");


// Configuración de Multer
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'C:/Proyectos/PokeApiHenry/PI-Pokemon-main/api/src/images');
  },
  filename: function(req, file, cb) {
    const filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
    cb(null, filename.replace(/\\/g, '/'));
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
          console.error(err);
          return res.status(500).send('Error al cargar la imagen.');
        }
       
        // Si se cargó la imagen con éxito, obtener su ruta
        const imagePath = req.file.path;
         const transformedPath = imagePath.replace(/\\/g, "/");
        // Obtiene los datos del pokemon del cuerpo de la solicitud 
        //y lo convierte de Json a un objeto
        const pokemon = JSON.parse(req.body.data);
        
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
        
        //Setea los valores de cada propiedad y crea el pokemon en la bd
        const newPokemon = await Pokemon.create({
          name:pokemon.name,
          image: transformedPath,
          hp:pokemon.hp,
          attack:pokemon.attack,
          defense:pokemon.defense,
          speed:pokemon.speed,
          height:heightString,
          weight:weightString,
          types: foundTypes.map(type => type.name)
        });
        //Llena la tabla intermedia de tipos, tomando el id del pokemon y el id de cada type
        await newPokemon.addTypes(foundTypes);
       
        res.status(201).json({
          pokemon: newPokemon,
          imagePath: imagePath
        });
      })
    } catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
}

module.exports = createPokemon;