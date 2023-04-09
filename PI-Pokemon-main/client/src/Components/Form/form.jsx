import { validate } from "./validate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTypes, postPokemon } from "../../redux/actions";
import {Link} from "react-router-dom"
function Form(props){
const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(loadTypes())
   
  },[dispatch])
    const types = useSelector(state=> state.allTypes)
    const [newPokemon, setNewPokemon] = useState({ name: "", hp: 0, attack: 0, defense: 0, 
    types: '', image: ""});
    //const [image, setImage] = useState(null);
   const [errors, setErrors] = useState({});
  const onChange = (event)=>{
    const { name, value } = event.target;
    
    setNewPokemon({...newPokemon, [name]:value})
  }
    // const handleImageChange = (event) => {
    //   setImage(event.target.files[0]);
    // };
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
        const error = validate(newPokemon);
        setErrors(error);
        const hasErrors = !!error.name || !!error.hp || !!error.attack ||
        !!error.defense || !!error.image || !!error.types;


        if (!hasErrors) {
       const pokemon = {
        name: newPokemon.name,
        image: newPokemon.image,
        hp: newPokemon.hp,
        attack: newPokemon.attack,
        defense: newPokemon.defense,
        speed: newPokemon.speed,
        height: newPokemon.height,
        weight: newPokemon.weight,
        types: newPokemon.types,
      };
    
      dispatch(postPokemon(pokemon));
      alert("Pokemon Creado")
    }
  
    };
      
      
    return (
        <form onSubmit={onSubmit} encType="multipart/form-data">
  <label htmlFor="name">Nombre:</label>
  <input type="text" name="name" onChange={onChange} value={newPokemon.name} />
  {errors.name && <div className="error">{errors.name}</div>}
<br />
  <label htmlFor="hp">HP:</label>
  <input type="number" name="hp" onChange={onChange} value={newPokemon.hp} />
  {errors.hp && <div className="error">{errors.hp}</div>}
<br />
  <label htmlFor="attack">Ataque:</label>
  <input type="number" name="attack" onChange={onChange} value={newPokemon.attack} />
  {errors.attack && <div className="error">{errors.attack}</div>}
<br />
  <label htmlFor="defense">Defensa:</label>
  <input type="number" name="defense" onChange={onChange} value={newPokemon.defense} />
  {errors.defense && <div className="error">{errors.defense}</div>}
<br />
  <label htmlFor="speed">Velocidad:</label>
  <input type="number" name="speed" onChange={onChange} value={newPokemon.speed} />
<br />
  <label htmlFor="height">Altura:</label>
  <input type="number" name="height" onChange={onChange} value={newPokemon.height} />
<br />
  <label htmlFor="weight">Peso:</label>
  <input type="number" name="weight" onChange={onChange} value={newPokemon.weight} />
  <br />
  <label htmlFor="image">Imagen Url:</label>
  <input type="text" name="image" onChange={onChange} value={newPokemon.image} />
  {errors.image && <div className="error">{errors.image}</div>}
  <br />
  <label htmlFor="types">Tipos:</label>
  <select name="types" id="types" onChange={onSelectChange} value={newPokemon.types} multiple>
    {types.map(type => (
        <option key={type.id} value={type.name}>
            {type.name}
        </option>
    ))}
</select>
  {errors.types && <div className="error">{errors.types}</div>}
  <br />

  {/* <label htmlFor="image">Imagen:</label>
  <input type="file" name="image" onChange={handleImageChange} />
<br /> */}
<Link to="/home">
<button>Volver</button>
</Link>
<span>            </span>
  <button type="submit">Crear Pokemon</button>

</form>

    )
}
export default Form