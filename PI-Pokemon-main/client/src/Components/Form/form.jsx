import { validate } from "./validate";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTypes, postPokemon } from "../../redux/actions";
import {NavLink} from "react-router-dom"
import formStyle from './form.modules.css'

function Form(props){
const dispatch = useDispatch()
  useEffect(()=>{
   dispatch(loadTypes())
   
  },[dispatch])
    const types = useSelector(state=> state.allTypes)
    const [newPokemon, setNewPokemon] = useState({ name: "", hp: 0, attack: 0, 
    defense: 0, types: '', image: ""});
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
       // name: newPokemon.name.replace(/\s+/g, ' ').trim(),
       name: newPokemon.name.trim().charAt(0).toUpperCase()+ newPokemon.name.slice(1),
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
      <div className="fondoForm">
        <h1 className="title">Crear Pokémon</h1>
        <form onSubmit={onSubmit} encType="multipart/form-data" className="form-container">
          <div class={formStyle.columnLeft}>
            <label className="labels" htmlFor="name">Nombre:</label>
            <input className="my-input" type="text" name="name" onChange={onChange} value={newPokemon.name} />
            {errors.name && <div className="error">{errors.name}</div>}
            
            <label className="labels" htmlFor="height">Altura:</label>
            <input className="my-input" type="number" name="height" onChange={onChange} value={newPokemon.height} />
            
            <label className="labels" htmlFor="weight">Peso:</label>
            <input className="my-input" type="number" name="weight" onChange={onChange} value={newPokemon.weight} />
        
            <label className="labels" htmlFor="image">Imagen Url:</label>
            <input className="my-input" type="text" name="image" onChange={onChange} value={newPokemon.image} />
            {errors.image && <div className="error">{errors.image}</div>}
            
            <label className="labels" htmlFor="types">Tipos:</label>
            <select className="my-select" name="types" id="types" onChange={onSelectChange} value={newPokemon.types} multiple>
              {types.map(type => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            {errors.types && <div className="error">{errors.types}</div>}
            
           
          </div>
          <div  className={formStyle.columnRight}>
            <label className="labels" htmlFor="hp">HP:</label>
            <input className="my-input" type="number" name="hp" onChange={onChange} value={newPokemon.hp} />
            {errors.hp && <div className="error">{errors.hp}</div>}
            
            <label className="labels" htmlFor="attack">Ataque:</label>
            <input className="my-input" type="number" name="attack" onChange={onChange} value={newPokemon.attack} />
            {errors.attack && <div className="error">{errors.attack}</div>}
           
            <label className="labels" htmlFor="defense">Defensa:</label>
            <input className="my-input" type="number" name="defense" onChange={onChange} value={newPokemon.defense} />
            {errors.defense && <div className="error">{errors.defense}</div>}
          
            <label className="labels" htmlFor="speed">Velocidad:</label>
            <input className="my-input" type="number" name="speed" onChange={onChange} value={newPokemon.speed} />
          
            
           
          </div>
          
          <NavLink to="/home">
              <button className="buttons">Volver</button>
            </NavLink>
          <button className="buttons" type="submit">Crear Pokemon</button>
          
        </form>
      </div>
    )
}
export default Form