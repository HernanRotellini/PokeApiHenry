const {Type} = require("../db");
const axios = require("axios")

const getAllTypes = async (req, res) => {
  try {
    const types = await Type.findAll();

    if(types.length >0){
    res.json(types);
}else
{
    const response = await axios.get('https://pokeapi.co/api/v2/type');
   
    const types = response.data.results;

for (const type of types) {
  await Type.create({ name: type.name });
}

res.status(201).json(types);}
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
module.exports = getAllTypes;