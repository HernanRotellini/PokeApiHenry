const { Router } = require('express');
//const getAllTypes = require('../controllers/getAllTypes');
const {loadTypes} = require("../controllers/getAllTypes")

const typerouter = Router();
//ruta comentada ya que se esta ejecutando el controlador 
//desde la inicializacion del server en index.js
//typerouter.get("/", getAllTypes);
typerouter.get("/", loadTypes);

module.exports = typerouter;