import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { getAllPokemons, getPokemonName } from "../../redux/actions";
import { useDispatch } from "react-redux";
export default function SearchBar(props) {
   const { handleResetFilters } = props;
   const [pokemonName, setPokemonName] = useState('');
   const dispatch = useDispatch()

   const onchange = ((event)=>{
     setPokemonName(event.target.value);
   });
 
   const findByName = async () => {
       // resetear los estados de filtro
     await handleResetFilters();
     dispatch(getPokemonName(pokemonName));
     
   };
 
   const goHome = async () => {
       // resetear los estados de filtro
     await handleResetFilters();
     dispatch(getAllPokemons());
     
   };

   return (
      
      <div>
         <input type='search' onChange={onchange} value={pokemonName}/>
         <button onClick={findByName}>Buscar</button>
         <br />
         <br />
         <Link to="/home">
            <button onClick={goHome}>Home</button>
            </Link>
            <span>     </span> <span>   </span>
            <Link to="/create">
            <button>Crear Pokemon</button>
            </Link>
         
      </div>
     
   );
}
