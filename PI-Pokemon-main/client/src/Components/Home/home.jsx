import { useEffect } from "react";
import {connect} from "react-redux"
import { useDispatch } from "react-redux";
import {getAllPokemons} from "../../redux/actions"

function Home({ allPokemons }) {
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getAllPokemons());
    }, [dispatch]);
  
    return (
      <div>
        {allPokemons.map((pokemon) => {
          return (
            <div key={pokemon.id}>
              {pokemon.image ? <img src={pokemon.image} alt="" />: <h2>No se encontro imagen</h2>}
              {pokemon.name ?<h2>{pokemon.name}</h2>: <h2>No tiene nombre</h2>}
              {pokemon.pokemon_types ? (
            <ul>
            {pokemon.pokemon_types.map((type) => {
             return <li key={type.id}>{type.name}</li>;
            })}
             </ul>
            ) : (
            <p>No hay tipos de Pokémon disponibles para este Pokémon.</p>
            )}
            </div>
          );
        })}
      </div>
    );
  }
  
  const mapStateToProps = (state) => {
    return {
      allPokemons: state.allPokemons,
    };
  };
  
  export default connect(mapStateToProps, null)(Home);