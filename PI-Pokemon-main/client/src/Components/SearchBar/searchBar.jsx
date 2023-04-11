import React, {  useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllPokemons, getPokemonName } from "../../redux/actions";
import { useDispatch } from "react-redux";
import "./searchBar.modules.css"
export default function SearchBar(props) {
   
   const [pokemonName, setPokemonName] = useState('');
   const dispatch = useDispatch()

   const onchange = ((event)=>{
     setPokemonName(event.target.value);
   });
   const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
          findByName(event)
      }
    }
    //evento que se ejecuta cuando el usuario hace click en otro lado que no sea el input
    const onBlur = () => {
      if (pokemonName.length === 0) {
        dispatch(getAllPokemons());
      }
    };
   const findByName = async () => {
      // Obtener el Pokémon por su nombre utilizando dispatch
      const pokeName = pokemonName.trim()
     dispatch(getPokemonName(pokeName));
    };
   return (
      
      <div className="searchBar">
         <input onBlur={onBlur} onKeyDown={handleKeyPress} type='search' onChange={onchange} value={pokemonName}/>
         <button onClick={findByName}>Buscar</button>
         <br />
         <br />
         
            <NavLink to="/create">
            <button className="buttons" >Crear Pokemon</button>
            </NavLink>
            </div>
     
     
   );
}
