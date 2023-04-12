import React, {  useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllPokemons, getPokemonName, loadTypes} from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./searchBar.modules.css"
import { searchValidate } from './searchvalidate'
export default function SearchBar(props) {
   
   const [pokemonName, setPokemonName] = useState('');
   const [errors, setErrors] = useState({name:''})
   const dispatch = useDispatch()

   const onchange = ((event)=>{
      const {value}= event.target
      if(value){
     setPokemonName(value);
      }else{
         dispatch(getAllPokemons());
         dispatch(getAllPokemons())
         .then(dispatch(loadTypes()))
         
         setPokemonName('');
      }
   });
   const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
          findByName(event)
      }
    }
   
   const findByName = () => {
      const validationErrors = searchValidate(pokemonName);
      setErrors(validationErrors);
      if (Object.keys(validationErrors).length === 0) {
         dispatch(getPokemonName(pokemonName.trim()));
      }
};
   return (
      
      <div className="searchBar">
         <input placeholder="Buscar pokemon por nombre" onKeyDown={handleKeyPress} type='search' onChange={onchange} value={pokemonName}/>
         <button onClick={findByName}>Buscar</button>
         {errors? <p>{errors.name}</p>: null}
         
         <br />
         <br />
         
            <NavLink to="/create">
            <button className="buttons" >Crear Pokemon</button>
            </NavLink>
            </div>
     
     
   );
}
