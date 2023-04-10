import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { getPokemonName } from "../../redux/actions";
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
   const findByName = async () => {
      await props.handleResetFilters();
      // Obtener el Pokémon por su nombre utilizando dispatch
      dispatch(getPokemonName(pokemonName));

    };
   return (
      
      <div className="searchBar">
         <input onKeyDown={handleKeyPress} type='search' onChange={onchange} value={pokemonName}/>
         <button onClick={findByName}>Buscar</button>
         <br />
         <br />
         <div className="mitad-rojo-gris">
            <Link to="/create">
            <button>Crear Pokemon</button>
            </Link>
            </div>
      </div>
     
   );
}
