const { Router } = require('express');
const getAllTypes = require('../controllers/getAllTypes');


const typerouter = Router();

typerouter.get("/", getAllTypes);

module.exports = typerouter;