const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const createPokemon = require("../controllers/postPokemon")
const getAllPokemons = require("../controllers/getAllPokemons")
const getPokemonbyName = require("../controllers/getPokemonbyName")
const getPokemonbyId = require("../controllers/getPokemonbyId")



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/", getAllPokemons)
router.get("/name", getPokemonbyName)
router.get("/:idPokemon", getPokemonbyId)
router.post("/", createPokemon)

module.exports = router;
