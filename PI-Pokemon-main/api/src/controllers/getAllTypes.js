const {Type} = require("../db");
const axios = require("axios")

const getAllTypes = async (req, res) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/type');
    const types = response.data.results;
    let allTypes= []
    for (const type of types) {
    const exist = await Type.findOne({where: { name : type.name.charAt(0).toUpperCase() + type.name.slice(1) }})
    if(!exist){
    const newType =await Type.create({ name: type.name.charAt(0).toUpperCase() + type.name.slice(1) });
    allTypes.push(newType)
    
    }else{
    allTypes.push(exist)
}
}
return allTypes;
  } catch (error) {
    console.log("Algo falló en getAllTypes");
  }
};
const loadTypes = async (req, res) => {
  try {
    const response = await getAllTypes();
    res.json(response)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {getAllTypes, loadTypes};