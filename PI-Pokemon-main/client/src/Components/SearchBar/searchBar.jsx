import React, {  useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getAllPokemons, getPokemonName, loadTypes} from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./searchBar.modules.css"
export default function SearchBar(props) {
   
   const [pokemonName, setPokemonName] = useState('');
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
  // Obtener el Pokémon por su nombre utilizando dispatch
  dispatch(getPokemonName(pokemonName.trim()));
};
   return (
      
      <div className="searchBar">
         <input onKeyDown={handleKeyPress} type='search' onChange={onchange} value={pokemonName}/>
         <button onClick={findByName}>Buscar</button>
         <br />
         <br />
         
            <NavLink to="/create">
            <button className="buttons" >Crear Pokemon</button>
            </NavLink>
            </div>
     
     
   );
}
