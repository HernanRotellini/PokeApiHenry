const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createPokemon = require("../controllers/postPokemon")
const getAllPokemons = require("../controllers/getAllPokemons")
const {Pokemon} = require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", getAllPokemons)
router.get("/pokemons/:idPokemon", async (req, res)=>{
  try {
    const {idPokemon} = req.params
    const pokemon = await Pokemon.findbyPK(idPokemon);
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).send(error.message);
  }
})
router.post("/pokemons", createPokemon)

module.exports = router;
