//import { validate } from "./validation";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTypes, postPokemon } from "../../redux/actions";

function Form(props){
const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(loadTypes())
   
  },[dispatch])
    const types = useSelector(state=> state.allTypes)
    const [newPokemon, setNewPokemon] = useState({ name: "", hp: 0, attack: 0, defense: 0, speed: 0, height: 0, weight: 0, types: ""});
    const [image, setImage] = useState(null);
  //  const [errors, setErrors] = useState();
  const onChange = (event)=>{
    const { name } = event.target;
    const value = name === "image" ? event.target.files[0] : event.target.value;
    setNewPokemon({...newPokemon, [name]:value})
  }
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
    const onSelectChange = (event) => {
      const options = event.target.options;
      const selectedTypes = [];
    
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selectedTypes.push(options[i].value);
        }
      }
      setNewPokemon({ ...newPokemon, types: selectedTypes });
    };
    function onSubmit(event) {
        event.preventDefault();
      //  const errors = validate(postPokemon);
       // setErrors(errors);
       const pokemon = {
        name: newPokemon.name,
        hp: newPokemon.hp,
        attack: newPokemon.attack,
        defense: newPokemon.defense,
        speed: newPokemon.speed,
        height: newPokemon.height,
        weight: newPokemon.weight,
        types: newPokemon.types,
      };
      dispatch(postPokemon(pokemon, image));
    };
      
      
    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
  <label htmlFor="name">Nombre:</label>
  <input type="text" name="name" onChange={onChange} value={newPokemon.name} required />

  <label htmlFor="hp">HP:</label>
  <input type="number" name="hp" onChange={onChange} value={newPokemon.hp} required />

  <label htmlFor="attack">Ataque:</label>
  <input type="number" name="attack" onChange={onChange} value={newPokemon.attack} required />

  <label htmlFor="defense">Defensa:</label>
  <input type="number" name="defense" onChange={onChange} value={newPokemon.defense} required />

  <label htmlFor="speed">Velocidad:</label>
  <input type="number" name="speed" onChange={onChange} value={newPokemon.speed} />

  <label htmlFor="height">Altura:</label>
  <input type="number" name="height" onChange={onChange} value={newPokemon.height} />

  <label htmlFor="weight">Peso:</label>
  <input type="number" name="weight" onChange={onChange} value={newPokemon.weight} />

  <label htmlFor="types">Tipos:</label>
  <select name="types" id="types" onChange={onSelectChange} value={newPokemon.types} multiple>
      {types.map(type=>
        <option id={type.id} value={type.name}>{type.name}</option>
      )}
  </select>
  

  <label htmlFor="image">Imagen:</label>
  <input type="file" name="image" onChange={handleImageChange} />

  <button type="submit">Crear Pokemon</button>
</form>
    )
}
export default Form