import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { getAllPokemons, getPokemonName } from "../../redux/actions";
import { useDispatch } from "react-redux";
export default function SearchBar(props) {
    const dispatch = useDispatch()
   const [pokemonName, setPokemonName] = useState('')


   const onchange = ((event)=>{
   setPokemonName(event.target.value)
   
})
const findByName = async () => {
    
    if(pokemonName){
    await dispatch(getPokemonName(pokemonName));
    }

    
    if(dispatch(getPokemonName(pokemonName))){ 
      await  dispatch(getAllPokemons())
     
    }
  };
  
  const goHome =  () => {
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
